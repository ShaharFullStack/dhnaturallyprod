-- DHnaturally Products Data
-- Natural Medicine Product Inserts

USE dhnaturally_db;

-- Insert products based on the documents in Database/products folder
INSERT INTO products (id, name, description, price, imageName) VALUES

-- Homeopathic Remedies
(UUID(), 'Anacardium Orientale', 'Homeopathic remedy traditionally used for memory issues, lack of confidence, and digestive problems. Supports mental clarity and emotional balance. Suitable for students and professionals experiencing mental fatigue.', 89.90, 'anacardium-orientale.jpg'),

(UUID(), 'Antimonium Crudum', 'Classical homeopathic remedy for digestive disorders, skin conditions, and mood imbalances. Particularly beneficial for overeating, indigestion, and irritability. Supports healthy digestion and emotional stability.', 79.90, 'antimonium-crudum.jpg'),

(UUID(), 'Apis Mellifica', 'Homeopathic bee venom remedy for inflammatory conditions, allergic reactions, and swelling. Excellent for insect bites, hives, and inflammatory pain. Supports natural healing of acute inflammatory conditions.', 85.90, 'apis-mellifica.jpg'),

(UUID(), 'Arnica Montana', 'Premier homeopathic remedy for trauma, bruising, and muscle soreness. Essential for post-surgical recovery, sports injuries, and physical trauma. Accelerates natural healing and reduces inflammation.', 95.90, 'arnica-montana.jpg'),

(UUID(), 'Arsenicum Album', 'Multi-purpose homeopathic remedy for anxiety, digestive issues, and respiratory conditions. Supports those with perfectionist tendencies, travel anxiety, and food poisoning. Promotes overall vitality and mental peace.', 92.90, 'arsenicum-album.jpg'),

(UUID(), 'Baryta Carbonica', 'Homeopathic remedy for developmental delays, shyness, and memory problems. Particularly beneficial for elderly individuals and children with learning difficulties. Supports cognitive function and social confidence.', 87.90, 'baryta-carbonica.jpg'),

(UUID(), 'Bryonia Alba', 'Homeopathic remedy for inflammation, joint pain, and respiratory conditions. Excellent for dry coughs, headaches, and arthritis symptoms. Supports natural healing of inflammatory conditions with dryness.', 83.90, 'bryonia-alba.jpg'),

(UUID(), 'Caffea Cruda', 'Homeopathic coffee remedy for overstimulation, insomnia, and hypersensitivity. Perfect for those sensitive to noise, light, and emotional stress. Promotes natural sleep and nervous system balance.', 78.90, 'caffea-cruda.jpg'),

(UUID(), 'Calcarea Carbonica', 'Constitutional homeopathic remedy for calcium metabolism, anxiety, and chronic fatigue. Supports bone health, immune function, and emotional stability. Ideal for overworked individuals and growing children.', 91.90, 'calcarea-carbonica.jpg'),

(UUID(), 'Calendula Officinalis', 'Healing homeopathic remedy for wounds, cuts, and skin conditions. Promotes rapid tissue regeneration and prevents infection. Essential for first aid and post-surgical wound care.', 76.90, 'calendula-officinalis.jpg'),

(UUID(), 'Carbo Vegetalis', 'Homeopathic charcoal remedy for digestive weakness, poor circulation, and chronic fatigue. Supports recovery from illness, improves oxygenation, and aids digestion. Known as the "corpse reviver" remedy.', 82.90, 'carbo-vegetalis.jpg'),

(UUID(), 'Colchicum Autumnale', 'Homeopathic remedy for gout, joint inflammation, and digestive sensitivity. Particularly effective for autumn-related symptoms and food aversions. Supports healthy uric acid metabolism and joint function.', 88.90, 'colchicum-autumnale.jpg'),

(UUID(), 'Graphites', 'Homeopathic remedy for skin conditions, metabolic issues, and emotional sensitivity. Excellent for eczema, psoriasis, and slow healing wounds. Supports healthy skin function and emotional balance.', 86.90, 'graphites.jpg'),

(UUID(), 'Hypericum Perforatum', 'Homeopathic St. John\'s Wort for nerve pain, depression, and wound healing. Premier remedy for nerve injuries, cuts, and emotional trauma. Supports nervous system healing and mood stability.', 89.90, 'hypericum-perforatum.jpg'),

(UUID(), 'Ignatia Amara', 'Homeopathic remedy for grief, emotional shock, and nervous tension. Essential for acute emotional trauma, loss, and relationship difficulties. Supports emotional healing and nervous system balance.', 93.90, 'ignatia-amara.jpg'),

(UUID(), 'Iris Versicolor', 'Homeopathic remedy for digestive disorders, headaches, and pancreatic dysfunction. Particularly effective for nausea, vomiting, and right-sided headaches. Supports healthy digestive enzyme production.', 84.90, 'iris-versicolor.jpg'),

(UUID(), 'Ledum Palustre', 'Homeopathic remedy for puncture wounds, insect bites, and joint pain. Essential first aid remedy for animal bites and penetrating injuries. Supports natural healing and prevents infection.', 81.90, 'ledum-palustre.jpg'),

(UUID(), 'Lycopodium Clavatum', 'Constitutional homeopathic remedy for digestive issues, liver support, and confidence building. Supports those with performance anxiety, bloating, and leadership challenges. Promotes digestive health and self-confidence.', 94.90, 'lycopodium-clavatum.jpg'),

(UUID(), 'Natrum Muriaticum', 'Homeopathic salt remedy for emotional suppression, chronic headaches, and dry conditions. Supports those who internalize emotions and suffer from chronic grief. Promotes emotional release and cellular hydration.', 87.90, 'natrum-muriaticum.jpg'),

(UUID(), 'Natrum Sulphuricum', 'Homeopathic remedy for liver support, depression, and water retention. Particularly effective for seasonal depression and liver detoxification. Supports healthy liver function and mood stability.', 90.90, 'natrum-sulphuricum.jpg'),

(UUID(), 'Nux Vomica', 'Homeopathic remedy for digestive overindulgence, stress, and toxic overload. Perfect for overworked executives, party-goers, and those with food sensitivities. Supports detoxification and digestive health.', 88.90, 'nux-vomica.jpg'),

(UUID(), 'Phytolacca Decandra', 'Homeopathic remedy for throat infections, breast issues, and glandular swelling. Excellent for sore throats, mastitis, and lymphatic congestion. Supports immune function and glandular health.', 85.90, 'phytolacca-decandra.jpg'),

(UUID(), 'Psorinum', 'Deep-acting homeopathic remedy for chronic conditions, skin problems, and low vitality. Supports those with chronic fatigue, recurrent infections, and difficult-to-heal conditions. Promotes deep constitutional healing.', 96.90, 'psorinum.jpg'),

(UUID(), 'Uranium Nitricum', 'Specialized homeopathic remedy for diabetes support, kidney function, and metabolic disorders. Supports healthy blood sugar regulation and kidney function. Complementary support for metabolic health.', 125.90, 'uranium-nitricum.jpg'),

(UUID(), 'Caulophyllum Thalictroides', 'Homeopathic remedy for women\'s health, labor support, and joint stiffness. Traditional support for childbirth, menstrual irregularities, and rheumatic conditions. Supports reproductive and joint health.', 92.90, 'caulophyllum-thalictroides.jpg'),

-- Herbal & Natural Supplements
(UUID(), 'Berberis Vulgaris Complex', 'Clinical-grade Barberry extract for diabetes management and liver support. Research-based formulation for blood sugar regulation and hepatic function. Supports healthy glucose metabolism and liver detoxification.', 149.90, 'berberis-vulgaris.jpg'),

(UUID(), 'Ginkgo Biloba Premium', 'Standardized Ginkgo extract for cognitive enhancement and circulation support. Improves memory, concentration, and peripheral circulation. Supports brain health and cognitive function in aging adults.', 119.90, 'ginkgo-biloba.jpg'),

(UUID(), 'Green Tea Extract Plus', 'High-potency Green Tea extract with EGCG for antioxidant support and metabolic health. Supports weight management, cardiovascular health, and cellular protection. Premium quality with standardized polyphenols.', 98.90, 'green-tea-extract.jpg'),

(UUID(), 'Gymnema Sylvestre', 'Ayurvedic herb for blood sugar support and sugar cravings reduction. Traditional "sugar destroyer" herb for diabetes management and weight control. Supports healthy insulin sensitivity and glucose metabolism.', 129.90, 'gymnema-sylvestre.jpg'),

(UUID(), 'Bitter Melon Complex', 'Momordica Charantia extract for natural diabetes support and blood sugar regulation. Traditional Asian medicine for metabolic health and insulin sensitivity. Research-backed formulation for glucose management.', 139.90, 'bitter-melon.jpg'),

(UUID(), 'Pomegranate Extract', 'Punica Granatum concentrate for antioxidant support and cardiovascular health. High in ellagic acid and anthocyanins for cellular protection. Supports heart health and anti-aging benefits.', 109.90, 'pomegranate-extract.jpg'),

(UUID(), 'Milk Thistle Silymarin', 'Silybum Marianum extract for liver protection and detoxification support. Standardized silymarin content for optimal hepatic support. Essential for liver health and toxin elimination.', 89.90, 'milk-thistle.jpg'),

(UUID(), 'Vanadium Complex', 'Therapeutic vanadium supplement for diabetes support and insulin sensitivity. Research-based mineral complex for blood sugar regulation. Supports healthy glucose metabolism and insulin function.', 156.90, 'vanadium-complex.jpg'),

(UUID(), 'Fel Tauri (Ox Bile)', 'Traditional bile extract for digestive support and fat absorption. Supports healthy digestion of fats and fat-soluble vitamins. Essential for those with gallbladder issues or poor fat digestion.', 99.90, 'fel-tauri.jpg'),

(UUID(), 'Human Growth Hormone Support', 'Natural HGH support complex with amino acids and growth factors. Supports healthy aging, muscle mass, and energy levels. Advanced anti-aging formulation for vitality and wellness.', 299.90, 'hgh-support.jpg');

-- Update the schema to ensure proper foreign key constraints are working
SET FOREIGN_KEY_CHECKS = 1;