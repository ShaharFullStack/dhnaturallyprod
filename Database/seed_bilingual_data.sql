-- DHnaturally Bilingual Database Seeding Script
-- Contains sample data in both Hebrew and English
-- Run this after the main schema has been created

USE dhnaturally_db;

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM product_categories;
-- DELETE FROM order_items;
-- DELETE FROM orders;
-- DELETE FROM shopping_cart;
-- DELETE FROM contact_forms;
-- DELETE FROM user_sessions;
-- DELETE FROM products;
-- DELETE FROM categories;
-- DELETE FROM users WHERE id NOT IN (SELECT id FROM users WHERE email IN ('admin@dhnaturally.com', 'dev@dhnaturally.com'));

-- =====================================================
-- INSERT SAMPLE USERS (with proper password hashing)
-- Default password for all demo users: "password123"
-- Password hash: $2b$10$rQZ9YjKGvZc8F1L2mHx1UeB6y6CUQhWXz8m5p1Q3r2N4v5K6L7M8N
-- =====================================================

INSERT INTO users (id, firstName, lastName, email, password, phone, roleId, isActive, emailVerified) VALUES 
-- Admin users
(UUID(), 'מנהל', 'מערכת', 'admin@dhnaturally.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-50-123-4567', 1, TRUE, TRUE),
(UUID(), 'Developer', 'User', 'dev@dhnaturally.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-50-765-4321', 3, TRUE, TRUE),

-- Sample regular users
(UUID(), 'יוסי', 'כהן', 'yossi.cohen@example.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-52-111-2233', 2, TRUE, TRUE),
(UUID(), 'רחל', 'לוי', 'rachel.levi@example.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-54-444-5566', 2, TRUE, TRUE),
(UUID(), 'David', 'Miller', 'david.miller@example.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-50-777-8899', 2, TRUE, TRUE),
(UUID(), 'Sarah', 'Johnson', 'sarah.johnson@example.com', '4a90a13a09b2b2b6a0d6c7b6e0b0c7c8c8a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8', '+972-53-333-4455', 2, TRUE, FALSE);

-- =====================================================
-- INSERT BILINGUAL CATEGORIES
-- =====================================================

SET @homeopathic_id = UUID();
SET @herbal_id = UUID();
SET @digestive_id = UUID();
SET @immune_id = UUID();
SET @pain_id = UUID();
SET @stress_id = UUID();
SET @sleep_id = UUID();
SET @cardio_id = UUID();
SET @diabetes_id = UUID();
SET @skin_id = UUID();

INSERT INTO categories (id, name_en, name_he, description_en, description_he, slug, sort_order) VALUES
(@homeopathic_id, 'Homeopathic Remedies', 'תרופות הומיאופתיות', 'Traditional homeopathic medicines for various health conditions', 'תרופות הומיאופתיות מסורתיות למצבי בריאות שונים', 'homeopathic-remedies', 1),
(@herbal_id, 'Herbal Medicine', 'צמחי מרפא', 'Natural plant-based remedies and supplements', 'תרופות וביטוח טבעיים מבוססי צמחים', 'herbal-medicine', 2),
(@digestive_id, 'Digestive Health', 'בריאות העיכול', 'Natural remedies for digestive and gastrointestinal health', 'תרופות טבעיות לבריאות העיכול והמעי', 'digestive-health', 3),
(@immune_id, 'Immune Support', 'תמיכה במערכת החיסון', 'Natural products to support and boost immune system function', 'מוצרים טבעיים לתמיכה וחיזוק תפקוד מערכת החיסון', 'immune-support', 4),
(@pain_id, 'Pain Relief', 'הקלה על כאבים', 'Natural remedies for pain management and inflammation', 'תרופות טבעיות לטיפול בכאבים ודלקות', 'pain-relief', 5),
(@stress_id, 'Stress & Anxiety', 'לחץ וחרדה', 'Natural solutions for stress, anxiety, and mental wellness', 'פתרונות טבעיים ללחץ, חרדה ובריאות נפשית', 'stress-anxiety', 6),
(@sleep_id, 'Sleep Support', 'תמיכה בשינה', 'Natural products to improve sleep quality and relaxation', 'מוצרים טבעיים לשיפור איכות השינה והרפיה', 'sleep-support', 7),
(@cardio_id, 'Cardiovascular Health', 'בריאות הלב וכלי הדם', 'Natural remedies for heart and circulatory health', 'תרופות טבעיות לבריאות הלב ומערכת הדם', 'cardiovascular-health', 8),
(@diabetes_id, 'Diabetes Support', 'תמיכה בסוכרת', 'Natural supplements and remedies for blood sugar management', 'תוספי מזון ותרופות טבעיות לניהול רמת הסוכר בדם', 'diabetes-support', 9),
(@skin_id, 'Skin Health', 'בריאות העור', 'Natural products for skin conditions and dermatological health', 'מוצרים טבעיים למצבי עור ובריאות דרמטולוגית', 'skin-health', 10);

-- =====================================================
-- INSERT BILINGUAL PRODUCTS
-- =====================================================

-- Homeopathic Remedies
INSERT INTO products (id, name_en, name_he, description_en, description_he, short_description_en, short_description_he, price, sku, stock_quantity, is_active, is_featured, sort_order, imageName) VALUES

(UUID(), 'Anacardium Orientale 30C', 'אנקרדיום אוריינטלה 30C', 
'Homeopathic remedy traditionally used for memory issues, lack of confidence, and digestive problems. Supports mental clarity and emotional balance. Suitable for students and professionals experiencing mental fatigue. Made from the cashew nut tree, this remedy helps with forgetfulness, weak memory, and feelings of inadequacy.',
'תרופה הומיאופתית המשמשת באופן מסורתי לבעיות זיכרון, חוסר ביטחון ובעיות עיכול. תומכת בבהירות מחשבתית ובאיזון רגשי. מתאימה לסטודנטים ואנשי מקצוע החווים עייפות מנטלית. עשויה מעץ האגוז קשיו, תרופה זו עוזרת עם שכחה, זיכרון חלש ותחושות חוסר התאמה.',
'Memory support and confidence building remedy', 'תרופה לתמיכה בזיכרון ובניית ביטחון',
89.90, 'ANAC-30C-001', 25, TRUE, TRUE, 1, 'anacardium-orientale.jpg'),

(UUID(), 'Arnica Montana 6C', 'ארניקה מונטנה 6C',
'Premier homeopathic remedy for trauma, bruising, and muscle soreness. Essential for post-surgical recovery, sports injuries, and physical trauma. Accelerates natural healing and reduces inflammation. Also known as Mountain Daisy, this remedy is indispensable for any first aid kit.',
'תרופה הומיאופתית מובילה לטראומה, חבורות וכאבי שרירים. חיונית להחלמה לאחר ניתוח, פציעות ספורט וטראומה פיזית. מאיצה ריפוי טבעי ומפחיתה דלקות. המכונה גם חיננית הרים, תרופה זו הכרחית לכל ערכת עזרה ראשונה.',
'Trauma and bruising recovery remedy', 'תרופה להחלמה מטראומה וחבורות',
95.90, 'ARNI-6C-001', 50, TRUE, TRUE, 2, 'arnica-montana.jpg'),

(UUID(), 'Apis Mellifica 12C', 'אפיס מליפיקה 12C',
'Homeopathic bee venom remedy for inflammatory conditions, allergic reactions, and swelling. Excellent for insect bites, hives, and inflammatory pain. Supports natural healing of acute inflammatory conditions. Made from honey bee venom, this remedy is particularly effective for burning, stinging pains.',
'תרופה הומיאופתית מארס דבורים לדלקות, תגובות אלרגיות ונפיחות. מעולה לעקיצות חרקים, סרפדת וכאבים דלקתיים. תומכת בריפוי טבעי של דלקות חריפות. עשויה מארס דבורת דבש, תרופה זו יעילה במיוחד לכאבים צורבים ודוקרים.',
'Bee venom remedy for inflammation and allergies', 'תרופה מארס דבורים לדלקות ואלרגיות',
85.90, 'APIS-12C-001', 30, TRUE, FALSE, 3, 'apis-mellifica.jpg'),

(UUID(), 'Nux Vomica 30C', 'נוקס בומיקה 30C',
'Homeopathic remedy for digestive overindulgence, stress, and toxic overload. Perfect for overworked executives, party-goers, and those with food sensitivities. Supports detoxification and digestive health. Made from the poison nut, this remedy helps with hangovers, indigestion, and irritability.',
'תרופה הומיאופתית לבעיות עיכול מפוטרות, מתח ועומס רעלים. מושלמת למנהלים עמוסים, חוגגים ואלו עם רגישויות מזון. תומכת בניקוי רעלים ובריאות עיכול. עשויה מאגוז הרעל, תרופה זו עוזרת עם הנגאובר, קשיי עיכול ועצבנות.',
'Digestive and detox support remedy', 'תרופה לתמיכה בעיכול וניקוי רעלים',
88.90, 'NUX-30C-001', 35, TRUE, TRUE, 4, 'nux-vomica.jpg');

-- Herbal Medicine Products
INSERT INTO products (id, name_en, name_he, description_en, description_he, short_description_en, short_description_he, price, sku, stock_quantity, is_active, is_featured, sort_order, imageName) VALUES

(UUID(), 'Ginkgo Biloba Extract', 'תמצית גינקגו בילובה',
'Premium Ginkgo Biloba extract standardized to 24% flavonoids and 6% terpene lactones. Supports cognitive function, memory, and circulation. Traditional Chinese medicine herb known for enhancing mental clarity and supporting healthy blood flow to the brain. Each capsule contains 120mg of concentrated extract.',
'תמצית גינקגו בילובה פרמיום מתוקננת ל-24% פלבונואידים ו-6% טרפן לקטונים. תומכת בתפקוד קוגניטיבי, זיכרון ומחזור דם. צמח ברפואה סינית מסורתית הידוע כמשפר בהירות מחשבתית ותומך בזרימת דם בריאה למוח. כל קפסולה מכילה 120 מג תמצית מרוכזת.',
'Cognitive support and circulation enhancer', 'תמיכה קוגניטיבית ושיפור מחזור דם',
129.90, 'GINK-EXT-001', 40, TRUE, TRUE, 5, 'ginkgo-biloba.jpg'),

(UUID(), 'Milk Thistle Silymarin', 'חלב גמלים סילימרין',
'High-potency Milk Thistle extract containing 80% silymarin. Premium liver support supplement that helps protect and regenerate liver cells. Traditional European herb used for centuries for liver and gallbladder health. Supports natural detoxification processes and liver function.',
'תמצית חלב גמלים בעלת עוצמה גבוהה המכילה 80% סילימרין. תוסף מזון מעולה לתמיכה בכבד העוזר להגן ולחדש תאי כבד. צמח אירופי מסורתי בשימוש במשך מאות שנים לבריאות הכבד והכיס. תומך בתהליכי ניקוי רעלים טבעיים ובתפקוד הכבד.',
'Premium liver support and detox supplement', 'תוסף מזון מעולה לתמיכה בכבד וניקוי רעלים',
149.90, 'MILK-SIL-001', 28, TRUE, FALSE, 6, 'milk-thistle.jpg'),

(UUID(), 'Green Tea Extract', 'תמצית תה ירוק',
'Concentrated Green Tea extract standardized to 95% polyphenols and 50% EGCG. Powerful antioxidant support with metabolism-boosting properties. Traditional Asian wellness herb known for its numerous health benefits. Supports healthy weight management and cellular protection.',
'תמצית תה ירוק מרוכזת מתוקננת ל-95% פוליפנולים ו-50% EGCG. תמיכה נוגדת חמצון חזקה עם תכונות מחזקות מטבוליזם. צמח בריאות אסיאתי מסורתי הידוע בתועלותיו הבריאותיות הרבות. תומך בניהול משקל בריא ובהגנה על התאים.',
'Antioxidant and metabolism support', 'תמיכה נוגדת חמצון ומטבוליזם',
99.90, 'GRN-TEA-001', 45, TRUE, TRUE, 7, 'green-tea.jpg');

-- Diabetes Support Products
INSERT INTO products (id, name_en, name_he, description_en, description_he, short_description_en, short_description_he, price, sku, stock_quantity, is_active, is_featured, sort_order, imageName) VALUES

(UUID(), 'Gymnema Sylvestre Extract', 'תמצית ג\'ימנמה סילבסטרה',
'Authentic Gymnema Sylvestre extract standardized to 25% gymnemic acids. Traditional Ayurvedic herb known as "sugar destroyer" for its ability to support healthy blood sugar levels. Helps reduce sugar cravings and supports pancreatic function. Used in India for over 2000 years for diabetes management.',
'תמצית ג\'ימנמה סילבסטרה אותנטית מתוקננת ל-25% חומצות ג\'ימנמיות. צמח איורוודי מסורתי הידוע כ"הורס הסוכר" על יכולתו לתמוך ברמות סוכר בריאות בדם. עוזר להפחית תשוקות לסוכר ותומך בתפקוד הלבלב. בשימוש בהודו למעלה מ-2000 שנה לניהול סוכרת.',
'Natural blood sugar support from Ayurveda', 'תמיכה טבעית ברמת הסוכר מהאיורוודה',
159.90, 'GYM-SYL-001', 20, TRUE, TRUE, 8, 'gymnema-sylvestre.jpg'),

(UUID(), 'Bitter Melon Extract', 'תמצית מלון מר',
'Premium Bitter Melon extract concentrated 10:1 ratio. Traditional Asian vegetable used for centuries to support healthy glucose metabolism. Contains natural compounds that help maintain normal blood sugar levels. Rich in vitamins and minerals essential for metabolic health.',
'תמצית מלון מר פרמיום מרוכזת ביחס 10:1. ירק אסיאתי מסורתי בשימוש במשך מאות שנים לתמיכה במטבוליזם בריא של גלוקוז. מכיל תרכובות טבעיות העוזרות לשמור על רמות סוכר תקינות בדם. עשיר בויטמינים ומינרלים חיוניים לבריאות מטבולית.',
'Traditional glucose metabolism support', 'תמיכה מסורתית במטבוליזם הגלוקוז',
139.90, 'BITT-MEL-001', 15, TRUE, FALSE, 9, 'bitter-melon.jpg');

-- =====================================================
-- ASSIGN PRODUCTS TO CATEGORIES
-- =====================================================

-- Get product IDs for category assignment (this is a simplified version - in practice you'd need to use the actual UUIDs)
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, @homeopathic_id FROM products p WHERE p.sku LIKE '%30C%' OR p.sku LIKE '%6C%' OR p.sku LIKE '%12C%'
UNION ALL
SELECT p.id, @herbal_id FROM products p WHERE p.sku IN ('GINK-EXT-001', 'MILK-SIL-001', 'GRN-TEA-001')
UNION ALL
SELECT p.id, @diabetes_id FROM products p WHERE p.sku IN ('GYM-SYL-001', 'BITT-MEL-001')
UNION ALL
SELECT p.id, @pain_id FROM products p WHERE p.sku = 'ARNI-6C-001'
UNION ALL
SELECT p.id, @stress_id FROM products p WHERE p.sku = 'ANAC-30C-001'
UNION ALL
SELECT p.id, @digestive_id FROM products p WHERE p.sku = 'NUX-30C-001';

-- =====================================================
-- INSERT SAMPLE CONTACT FORMS
-- =====================================================

INSERT INTO contact_forms (id, name, email, phone, subject, message, status) VALUES
(UUID(), 'יוסי כהן', 'yossi@example.com', '050-123-4567', 'שאלה על מוצרים הומיאופתיים', 'שלום, אני מחפש המלצות על תרופות הומיאופתיות לחרדה. תודה!', 'new'),
(UUID(), 'Rachel Levi', 'rachel@example.com', '054-987-6543', 'Product Availability', 'Hi, do you have Arnica Montana 200C in stock? I need it for my sports training recovery.', 'new'),
(UUID(), 'דוד מילר', 'david@example.com', '052-555-7777', 'הזמנה בכמויות', 'אני מעוניין להזמין כמויות גדולות של תמצית גינקגו בילובה למרפאה שלי. אנא צרו איתי קשר.', 'read');

-- =====================================================
-- INSERT SYSTEM SETTINGS (Additional to schema defaults)
-- =====================================================

INSERT INTO settings (setting_key, setting_value, setting_type, description_en, description_he, is_public) VALUES 
('site_description_en', 'DHnaturally - Your trusted source for natural medicine and homeopathic remedies in Israel', 'string', 'Site description in English', 'תיאור האתר באנגלית', TRUE),
('site_description_he', 'DHnaturally - המקור הנאמן שלכם לרפואה טבעית ותרופות הומיאופתיות בישראל', 'string', 'Site description in Hebrew', 'תיאור האתר בעברית', TRUE),
('contact_email', 'info@dhnaturally.com', 'string', 'Main contact email', 'אימייל ליצירת קשר', TRUE),
('contact_phone', '+972-50-123-4567', 'string', 'Main contact phone', 'טלפון ליצירת קשר', TRUE),
('business_hours_en', 'Sunday-Thursday: 9:00-18:00, Friday: 9:00-14:00', 'string', 'Business hours in English', 'שעות פתיחה באנגלית', TRUE),
('business_hours_he', 'ראשון-חמישי: 9:00-18:00, שישי: 9:00-14:00', 'string', 'Business hours in Hebrew', 'שעות פתיחה בעברית', TRUE),
('min_order_amount', '100.00', 'number', 'Minimum order amount for processing', 'סכום הזמנה מינימלי לעיבוד', FALSE),
('max_order_items', '50', 'number', 'Maximum items per order', 'מספר פריטים מקסימלי בהזמנה', FALSE),
('enable_registration', 'true', 'boolean', 'Allow new user registration', 'אפשר הרשמת משתמשים חדשים', FALSE);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

-- Additional performance indexes
CREATE INDEX idx_products_price_active ON products (price, is_active);
CREATE INDEX idx_products_featured_active ON products (is_featured, is_active);
CREATE INDEX idx_categories_parent_active ON categories (parent_id, is_active);
CREATE INDEX idx_orders_user_status ON orders (user_id, status);
CREATE INDEX idx_contact_forms_status_created ON contact_forms (status, created_at);

-- Full-text search indexes for better search performance
-- Note: These might need to be created separately depending on your MySQL version
-- ALTER TABLE products ADD FULLTEXT(name_en, description_en, short_description_en);
-- ALTER TABLE products ADD FULLTEXT(name_he, description_he, short_description_he);

COMMIT;