require('dotenv').config(); // 👈 Load environment variables
const port  = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// CLIENT SIGNUP
app.post('/signup/client', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
 console.log("1");
    // Check if email already exists
    const { data: existing } = await supabase
      .from('client_table')
      .select('email')
      .eq('email', email)
      .single();
    if (existing) return res.status(400).json({ error: 'Email already exists' });
 console.log("2");
    const password_hash = await bcrypt.hash(password, 10);
    const username = `${firstName}${lastName}`;
 console.log("3");
    const { error: insertError } = await supabase
      .from('client_table')
      .insert([{
        username,
        email,
        password_hash,
        first_name: firstName,
        last_name: lastName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }]);
      console.log("4");
    if (insertError) return res.status(400).json({ error: insertError.message });

    res.status(201).json({
      message: 'Client created',
      user: { email, username },
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DEVELOPER SIGNUP
app.post('/signup/developer', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('developer_table')
      .select('email')
      .eq('email', email)
      .single();
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const username = `${firstName}${lastName}`;

    const { error: insertError } = await supabase
      .from('developer_table')
      .insert([{
        username,
        email,
        password_hash,
        first_name: firstName,
        last_name: lastName,
        profile_completed: false,
        step_completed: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }]);
    if (insertError) return res.status(400).json({ error: insertError.message });

    res.status(201).json({
      message: 'Developer created',
      user: { email, username },
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/developer/update-step', async (req, res) => {
  const { username, step } = req.body; // username must be provided by frontend
  const { error } = await supabase
    .from('developer_table')
    .update({ step_completed: step, updated_at: new Date().toISOString() })
    .eq('username', username); // only update this developer

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});


app.post('/developer/complete-profile', async (req, res) => {
  const { username } = req.body; // username must be provided by frontend
  const { error } = await supabase
    .from('developer_table')
    .update({ profile_completed: true, updated_at: new Date().toISOString() })
    .eq('username', username); // only update this developer

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});





app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Try to find user in client_table
    let { data: user, error } = await supabase
      .from('client_table')
      .select('username, password_hash, first_name, last_name')
      .eq('email', email)
      .single();

    let role = 'client';

    // 2. If not found in client_table, try developer_table
    if (!user || error) {
      const { data: devUser, error: devError } = await supabase
        .from('developer_table')
        .select('username, password_hash, first_name, last_name, profile_completed, step_completed')
        .eq('email', email)
        .single();
      if (!devUser || devError) {
        return res.status(400).json({ error: 'User not found.' });
      }
      user = devUser;
      role = 'developer';
    }

    // 3. Check password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    // 4. Prepare response
    res.json({
      user: {
        email,
        username: user.username,
        role,
        firstName: user.first_name,
        lastName: user.last_name,
        profile_completed: user.profile_completed ?? true, // clients always true
        step_completed: user.step_completed ?? null,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/developer/profile-photo/upload', upload.single('profile_photo'), async (req, res) => {
  try {
    const { username } = req.body;
    const file = req.file;    

    

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!username) return res.status(400).json({ error: "No username provided" });

    // Use a unique file path for each user, e.g., images/profile/username.ext
    const fileExt = file.originalname.split('.').pop();
    const filePath = `profile/${username}.${fileExt}`;

    // Upload to Supabase Storage (bucket: images) sdf
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath);

    const profile_photo_url = urlData.publicUrl;

    // Save URL in developer_table
    const { error: dbError } = await supabase
      .from('developer_table')
      .update({ profile_photo_url, updated_at: new Date().toISOString() })
      .eq('username', username);

    if (dbError) return res.status(500).json({ error: dbError.message });

    res.json({ profile_photo_url });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
