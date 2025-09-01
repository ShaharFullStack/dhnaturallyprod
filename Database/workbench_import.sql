-- DHnaturally Workbench Import Script
-- Creates database, products table and inserts sample products
-- Ready to paste into MySQL Workbench or run from the mysql client

-- 1) Create database with UTF8MB4 for Hebrew support
CREATE DATABASE IF NOT EXISTS dhnaturally_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE dhnaturally_db;

-- 2) Create a minimal products table compatible with provided seed data
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_he VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    description_he TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    imageName VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_price (price),
    INDEX idx_created_at (created_at)
);

INSERT INTO products (id, name, name_he, description, description_he, price, imageName) VALUES

(UUID(), 'Anacardium Orientale', 'Anacardium Orientale', 'Homeopathic remedy traditionally used for memory issues, lack of confidence, and digestive problems. Supports mental clarity and emotional balance. Suitable for students and professionals experiencing mental fatigue.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Antimonium Crudum', 'Antimonium Crudum', 'Classical homeopathic remedy for digestive disorders, skin conditions, and mood imbalances. Particularly beneficial for overeating, indigestion, and irritability. Supports healthy digestion and emotional stability.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Apis Mellifica', 'Apis Mellifica', 'Homeopathic bee venom remedy for inflammatory conditions, allergic reactions, and swelling. Excellent for insect bites, hives, and inflammatory pain. Supports natural healing of acute inflammatory conditions.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Arnica Montana', 'Arnica Montana', 'Premier homeopathic remedy for trauma, bruising, and muscle soreness. Essential for post-surgical recovery, sports injuries, and physical trauma. Accelerates natural healing and reduces inflammation.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Arsenicum Album', 'Arsenicum Album', 'Multi-purpose homeopathic remedy for anxiety, digestive issues, and respiratory conditions. Supports those with perfectionist tendencies, travel anxiety, and food poisoning. Promotes overall vitality and mental peace.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Baryta Carbonica', 'Baryta Carbonica', 'Homeopathic remedy for developmental delays, shyness, and memory problems. Particularly beneficial for elderly individuals and children with learning difficulties. Supports cognitive function and social confidence.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Bryonia Alba', 'Bryonia Alba', 'Homeopathic remedy for inflammation, joint pain, and respiratory conditions. Excellent for dry coughs, headaches, and arthritis symptoms. Supports natural healing of inflammatory conditions with dryness.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Caffea Cruda', 'Caffea Cruda', 'Homeopathic coffee remedy for overstimulation, insomnia, and hypersensitivity. Perfect for those sensitive to noise, light, and emotional stress. Promotes natural sleep and nervous system balance.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Calcarea Carbonica', 'Calcarea Carbonica', 'Constitutional homeopathic remedy for calcium metabolism, anxiety, and chronic fatigue. Supports bone health, immune function, and emotional stability. Ideal for overworked individuals and growing children.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Calendula Officinalis', 'Calendula Officinalis', 'Healing homeopathic remedy for wounds, cuts, and skin conditions. Promotes rapid tissue regeneration and prevents infection. Essential for first aid and post-surgical wound care.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Carbo Vegetalis', 'Carbo Vegetalis', 'Homeopathic charcoal remedy for digestive weakness, poor circulation, and chronic fatigue. Supports recovery from illness, improves oxygenation, and aids digestion. Known as the "corpse reviver" remedy.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Colchicum Autumnale', 'Colchicum Autumnale', 'Homeopathic remedy for gout, joint inflammation, and digestive sensitivity. Particularly effective for autumn-related symptoms and food aversions. Supports healthy uric acid metabolism and joint function.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Graphites', 'Graphites', 'Homeopathic remedy for skin conditions, metabolic issues, and emotional sensitivity. Excellent for eczema, psoriasis, and slow healing wounds. Supports healthy skin function and emotional balance.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Hypericum Perforatum', 'Hypericum Perforatum', 'Homeopathic St. John\'s Wort for nerve pain, depression, and wound healing. Premier remedy for nerve injuries, cuts, and emotional trauma. Supports nervous system healing and mood stability.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Ignatia Amara', 'Ignatia Amara', 'Homeopathic remedy for grief, emotional shock, and nervous tension. Essential for acute emotional trauma, loss, and relationship difficulties. Supports emotional healing and nervous system balance.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Iris Versicolor', 'Iris Versicolor', 'Homeopathic remedy for digestive disorders, headaches, and pancreatic dysfunction. Particularly effective for nausea, vomiting, and right-sided headaches. Supports healthy digestive enzyme production.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Ledum Palustre', 'Ledum Palustre', 'Homeopathic remedy for puncture wounds, insect bites, and joint pain. Essential first aid remedy for animal bites and penetrating injuries. Supports natural healing and prevents infection.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Lycopodium Clavatum', 'Lycopodium Clavatum', 'Constitutional homeopathic remedy for digestive issues, liver support, and confidence building. Supports those with performance anxiety, bloating, and leadership challenges. Promotes digestive health and self-confidence.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Natrum Muriaticum', 'Natrum Muriaticum', 'Homeopathic salt remedy for emotional suppression, chronic headaches, and dry conditions. Supports those who internalize emotions and suffer from chronic grief. Promotes emotional release and cellular hydration.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Natrum Sulphuricum', 'Natrum Sulphuricum', 'Homeopathic remedy for liver support, depression, and water retention. Particularly effective for seasonal depression and liver detoxification. Supports healthy liver function and mood stability.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Nux Vomica', 'Nux Vomica', 'Homeopathic remedy for digestive overindulgence, stress, and toxic overload. Perfect for overworked executives, party-goers, and those with food sensitivities. Supports detoxification and digestive health.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Phytolacca Decandra', 'Phytolacca Decandra', 'Homeopathic remedy for throat infections, breast issues, and glandular swelling. Excellent for sore throats, mastitis, and lymphatic congestion. Supports immune function and glandular health.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Psorinum', 'Psorinum', 'Deep-acting homeopathic remedy for chronic conditions, skin problems, and low vitality. Supports those with chronic fatigue, recurrent infections, and difficult-to-heal conditions. Promotes deep constitutional healing.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Uranium Nitricum', 'Uranium Nitricum', 'Specialized homeopathic remedy for diabetes support, kidney function, and metabolic disorders. Supports healthy blood sugar regulation and kidney function. Complementary support for metabolic health.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Caulophyllum Thalictroides', 'Caulophyllum Thalictroides', 'Homeopathic remedy for women\'s health, labor support, and joint stiffness. Traditional support for childbirth, menstrual irregularities, and rheumatic conditions. Supports reproductive and joint health.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Berberis Vulgaris Complex', 'Berberis Vulgaris Complex', 'Clinical-grade Barberry extract for diabetes management and liver support. Research-based formulation for blood sugar regulation and hepatic function. Supports healthy glucose metabolism and liver detoxification.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Ginkgo Biloba Premium', 'Ginkgo Biloba Premium', 'Standardized Ginkgo extract for cognitive enhancement and circulation support. Improves memory, concentration, and peripheral circulation. Supports brain health and cognitive function in aging adults.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Green Tea Extract Plus', 'Green Tea Extract Plus', 'High-potency Green Tea extract with EGCG for antioxidant support and metabolic health. Supports weight management, cardiovascular health, and cellular protection. Premium quality with standardized polyphenols.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Gymnema Sylvestre', 'Gymnema Sylvestre', 'Ayurvedic herb for blood sugar support and sugar cravings reduction. Traditional "sugar destroyer" herb for diabetes management and weight control. Supports healthy insulin sensitivity and glucose metabolism.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Bitter Melon Complex', 'Bitter Melon Complex', 'Momordica Charantia extract for natural diabetes support and blood sugar regulation. Traditional Asian medicine for metabolic health and insulin sensitivity. Research-backed formulation for glucose management.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Pomegranate Extract', 'Pomegranate Extract', 'Punica Granatum concentrate for antioxidant support and cardiovascular health. High in ellagic acid and anthocyanins for cellular protection. Supports heart health and anti-aging benefits.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Milk Thistle Silymarin', 'Milk Thistle Silymarin', 'Silybum Marianum extract for liver protection and detoxification support. Standardized silymarin content for optimal hepatic support. Essential for liver health and toxin elimination.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Vanadium Complex', 'Vanadium Complex', 'Therapeutic vanadium supplement for diabetes support and insulin sensitivity. Research-based mineral complex for blood sugar regulation. Supports healthy glucose metabolism and insulin function.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Fel Tauri (Ox Bile)', 'Fel Tauri (Ox Bile)', 'Traditional bile extract for digestive support and fat absorption. Supports healthy digestion of fats and fat-soluble vitamins. Essential for those with gallbladder issues or poor fat digestion.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png'),

(UUID(), 'Human Growth Hormone Support', 'Human Growth Hormone Support', 'Natural HGH support complex with amino acids and growth factors. Supports healthy aging, muscle mass, and energy levels. Advanced anti-aging formulation for vitality and wellness.', 'תיאור בעברית לא זמין; יש לתרגם', 169.90, 'product.png');

-- 4) Ensure foreign key checks are enabled (if you run other scripts that require them)
SET FOREIGN_KEY_CHECKS = 1;

-- End of script
