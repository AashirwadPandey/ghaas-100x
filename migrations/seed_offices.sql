-- Seed at least 12 offices
INSERT INTO offices (id, name, phone, address, lat, lng, website, hours)
VALUES
  (gen_random_uuid(), 'Kathmandu Municipal Office', '+977-1-1234567', 'Kathmandu', 27.7172, 85.3240, 'https://kathmandu.gov.np', 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Lalitpur Municipal Office', '+977-1-7654321', 'Lalitpur', 27.6644, 85.3188, 'https://lalitpurmun.gov.np', 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Bhaktapur Municipal Office', '+977-1-5550000', 'Bhaktapur', 27.6710, 85.4298, 'https://bhaktapurmun.gov.np', 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Pokhara Metropolitan Office', '+977-61-520000', 'Pokhara', 28.2096, 83.9856, 'https://pokharamun.gov.np', 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Biratnagar Metropolitan Office', '+977-21-470000', 'Biratnagar', 26.4535, 87.2718, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Butwal Sub-Metropolitan Office', '+977-71-540000', 'Butwal', 27.7000, 83.4500, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Hetauda Sub-Metropolitan Office', '+977-57-520000', 'Hetauda', 27.4167, 85.0333, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Dharan Sub-Metropolitan Office', '+977-25-520000', 'Dharan', 26.8121, 87.2797, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Janakpur Sub-Metropolitan Office', '+977-41-520000', 'Janakpur', 26.7288, 85.9250, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Nepalgunj Sub-Metropolitan Office', '+977-81-520000', 'Nepalgunj', 28.0500, 81.6167, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Dhangadhi Sub-Metropolitan Office', '+977-91-520000', 'Dhangadhi', 28.6833, 80.6000, NULL, 'Sun-Fri 10:00-17:00'),
  (gen_random_uuid(), 'Itahari Sub-Metropolitan Office', '+977-25-520100', 'Itahari', 26.6667, 87.2667, NULL, 'Sun-Fri 10:00-17:00');
