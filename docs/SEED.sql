-- Lakshya AI · Demo seed data
-- Run AFTER SCHEMA.sql. Creates believable institutions and challenges so the demo feels alive.

insert into institutions (name, city, state, type, total_score) values
  ('Delhi Public School, R.K. Puram', 'New Delhi', 'Delhi', 'school', 9840),
  ('DPS Dwarka', 'New Delhi', 'Delhi', 'school', 9620),
  ('IIMT University', 'Meerut', 'Uttar Pradesh', 'university', 9485),
  ('Vellore Institute of Technology', 'Vellore', 'Tamil Nadu', 'university', 9210),
  ('Manipal University Jaipur', 'Jaipur', 'Rajasthan', 'university', 9180),
  ('The Doon School', 'Dehradun', 'Uttarakhand', 'school', 8950),
  ('La Martiniere College', 'Lucknow', 'Uttar Pradesh', 'school', 8740),
  ('IIIT Hyderabad', 'Hyderabad', 'Telangana', 'university', 8620),
  ('Welham Girls'' School', 'Dehradun', 'Uttarakhand', 'school', 8510),
  ('BITS Pilani', 'Pilani', 'Rajasthan', 'university', 8480),
  ('SRM Institute of Science and Technology', 'Chennai', 'Tamil Nadu', 'university', 8390),
  ('Mayo College', 'Ajmer', 'Rajasthan', 'school', 8240),
  ('Christ University', 'Bangalore', 'Karnataka', 'university', 8190),
  ('Modern School Barakhamba Road', 'New Delhi', 'Delhi', 'school', 8050),
  ('Symbiosis International University', 'Pune', 'Maharashtra', 'university', 7920);

-- Challenges
insert into challenges (title, brief, category, difficulty, points_reward, is_active) values
  ('Build a 5-prompt chain that teaches photosynthesis to a 7-year-old', 'Design 5 sequential prompts for ChatGPT/GPT-4o that progressively teach photosynthesis to a 7-year-old who has never heard the word. Submit the prompts plus a screenshot or transcript of the final AI output. Judged on pedagogical sequencing, age-appropriateness, and creativity.', 'prompt-engineering', 'beginner', 100, true),
  ('AI ethics in Indian education — write the policy', 'Write a 300-word AI usage policy that you would propose to your school principal. Cover: where AI use is allowed, where it isn''t, how to detect misuse, and how to teach AI literacy. Cite at least one real Indian regulation or NEP 2020 clause.', 'ai-ethics', 'intermediate', 150, true),
  ('Solve a real Indian problem with one AI prompt', 'Identify a real operational problem in your school, college or local area (e.g. timetabling, bus routing, exam paper translation, library catalogue cleanup). Solve it with ONE prompt to ChatGPT/GPT-4o. Submit the prompt, the AI output, and a 100-word reflection on whether it actually works.', 'ai-solve', 'intermediate', 200, true),
  ('Build a no-code AI tool in 60 minutes', 'Use any no-code platform (Lovable, Bolt, Make, n8n, or just a Google Apps Script) plus an AI API to build a tool that solves a small problem. Submit a live link or a 90-second screen recording.', 'ai-build', 'advanced', 300, true);
