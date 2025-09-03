CREATE DATABASE IF NOT EXISTS dhnaturally_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dhnaturally_db;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name TEXT NOT NULL,
  name_he TEXT NOT NULL,
  description TEXT NOT NULL,
  description_he TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  imageName VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name(191)),
  INDEX idx_price (price),
  INDEX idx_created_at (created_at)
);

-- Ensure bilingual columns exist for older schemas that predate these fields.
SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
              WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'name_he');
SET @sql := IF(@cnt = 0, 'ALTER TABLE products ADD COLUMN name_he TEXT AFTER name', 'SELECT "name_he exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
              WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'description_he');
SET @sql := IF(@cnt = 0, 'ALTER TABLE products ADD COLUMN description_he TEXT AFTER description', 'SELECT "description_he exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ensure `name` column can be safely changed to TEXT by dropping/recreating index if needed.
SET @idx_cnt := (SELECT COUNT(*) FROM information_schema.STATISTICS
                  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND INDEX_NAME = 'idx_name');
SET @sql := IF(@idx_cnt = 1, 'ALTER TABLE products DROP INDEX idx_name', 'SELECT "idx_name missing"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
               WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'name');
SET @sql := IF(@cnt = 1, 'ALTER TABLE products MODIFY COLUMN name TEXT NOT NULL', 'SELECT "name column missing"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
               WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'name');
SET @sql := IF(@cnt = 1, 'CREATE INDEX idx_name ON products (name(191))', 'SELECT "name column missing"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

INSERT INTO products (id, name, name_he, description, description_he, price, imageName) VALUES
-- Diabetes & Blood Sugar Management
(UUID(), 'DH1 - Diabetes Support Complex', 'DH1 - קומפלקס תמיכה בסוכרת', 'Berberis Vulgaris, Momordica Charantia, Vanadium Metalicum. Enhances insulin sensitivity, reduces blood glucose through AMPK and gut microbiome pathways. Mimics insulin upon cell entry, reduces oxidative stress related to insulin resistance. Promotes glycogen synthesis in the liver for optimal glucose regulation.', 'ברבריס וולגריס, מומורדיקה צ׳רנטיה, ונדיום מטליקום. משפר רגישות לאינסולין, מפחית גלוקוז בדם דרך נתיבי AMPK ומיקרוביום מעיים. מחקה אינסולין בכניסה לתא, מפחית לחץ חמצוני הקשור לעמידות לאינסולין. מקדם סינתזת גליקוגן בכבד לויסות גלוקוז מיטבי.', 169.90, 'product.png'),

(UUID(), 'DH2 - Sugar Craving Control', 'DH2 - בקרת התשוקות לסוכר', 'Gymnema Sylvestre. Reduces absorption of glucose in intestine, lowers sugar cravings significantly. Clinically proven to lower HbA1c levels. Blocks sweet taste receptors, making sugary foods less appealing while supporting healthy blood sugar metabolism.', 'גימנמה סילווסטר. מפחית ספיגת גלוקוז במעי, מוריד התשוקות לסוכר באופן משמעותי. מוכח קלינית להורדת רמות HbA1c. חוסם קולטני טעם מתוק, הופך מזונות מתוקים לפחות מושכים תוך תמיכה במטבוליזם בריא של סוכר בדם.', 169.90, 'product.png'),

(UUID(), 'DH8 - Metabolic Balance Formula', 'DH8 - נוסחת איזון מטבולי', 'Uranium Nitricum. Lowers blood glucose levels, helps with excessive thirst and frequent urination, strengthens bladder function. Improves and balances metabolic function while addressing blood glucose levels, hypertension, and fatty liver conditions.', 'אורניום ניטריקום. מוריד רמות גלוקוז בדם, עוזר עם צמא מוגזם והשתנה תכופה, מחזק תפקוד שלפוחית השתן. משפר ומאזן תפקוד מטבולי תוך התמודדות עם רמות גלוקוז בדם, יתר לחץ דם ומצבי כבד שומני.', 169.90, 'product.png'),

-- Weight Management Series
(UUID(), 'DH3 - Metabolic Weight Support', 'DH3 - תמיכה במשקל מטבולי', 'Calcarea Carbonica, Nux Vomica, Capsicum. Controls cravings, speeds up slow metabolism and increases intracellular activity. Especially effective for those with abdominal weight gain, helps with fat burning and metabolic acceleration.', 'קלקריאה קרבוניקה, נוקס וומיקה, קפסיקום. שולט בתשוקות, מזרז מטבוליזם איטי ומגביר פעילות תוך תאית. יעיל במיוחד עבור אלה עם עלייה במשקל בבטן, עוזר עם שריפת שומן והאצת מטבוליזם.', 169.90, 'product.png'),

(UUID(), 'DH4 - Thyroid Weight Support', 'DH4 - תמיכה במשקל בלוטת התריס', 'Natrum Muriaticum, Fucus Vesiculosus, Lycopodium. Helps with salty cravings, boosts metabolism, addresses thyroid deficiency with natural iodine. Targets obesity and fat burning especially in thighs and buttocks areas.', 'נתרום מוריאטיקום, פוקוס וסיקולוסוס, ליקופודיום. עוזר עם התשוקות למלוח, מגביר מטבוליזם, מתמודד עם מחסור בלוטת התריס עם יוד טבעי. מתמקד בהשמנה ושריפת שומן במיוחד באזורי הירכיים והישבן.', 169.90, 'product.png'),

(UUID(), 'DH5 - Hormonal Weight Balance', 'DH5 - איזון משקל הורמונלי', 'Lycopodium, Antimonium Crudum, Graphites, Phytolacca. Helps with sweet cravings, addresses hormonal imbalance due to menopause and glandular activity. Aids with indigestion and overeating patterns related to hormonal changes.', 'ליקופודיום, אנטימוניום קרודום, גרפיטס, פיטולקה. עוזר עם התשוקות למתוקים, מתמודד עם חוסר איזון הורמונלי עקב גיל המעבר ופעילות בלוטית. מסייע עם עיכול לקוי ודפוסי אכילה מוגזמת הקשורים לשינויים הורמונליים.', 169.90, 'product.png'),

-- Digestive & Liver Support
(UUID(), 'DH6 - Digestive Optimization', 'DH6 - אופטימיזציה עיכולית', 'Nux Vomica, Antimonium Crudum. Improves digestion, addresses sedentary eating habits with anti-inflammatory properties. Controls excessive appetite and supports healthy digestive patterns for modern lifestyle challenges.', 'נוקס וומיקה, אנטימוניום קרודום. משפר עיכול, מתמודד עם הרגלי אכילה בישיבה עם תכונות אנטי דלקתיות. שולט בתיאבון מוגזם ותומך בדפוסי עיכול בריאים לאתגרי אורח החיים המודרני.', 169.90, 'product.png'),

(UUID(), 'DH7 - Liver Detox Complex', 'DH7 - קומפלקס ניקוי כבד', 'Lycopodium, Nux Vomica, Fel Tauri, Psorinum. Helps cleanse fat toxins from sluggish liver, supports optimal liver management and digestive health. Reduces cholesterol, liver inflammation and promotes healthy hepatic function.', 'ליקופודיום, נוקס וומיקה, פל טאורי, פסורינום. עוזר לנקות רעלי שומן מכבד איטי, תומך בניהול כבד מיטבי ובריאות עיכול. מפחית כולסטרול, דלקת כבד ומקדם תפקוד כבדי בריא.', 169.90, 'product.png'),

(UUID(), 'DH26 - System Cleanser', 'DH26 - מנקה מערכות', 'Natrum Sulphuricum. Comprehensive liver, kidney and pancreas cleanser. Removes accumulated salts and toxins, supports optimal organ function and promotes natural detoxification pathways throughout the body.', 'נתרום סולפוריקום. מנקה מקיף של כבד, כליות ולבלב. מסיר מלחים ורעלים שהצטברו, תומך בתפקוד מיטבי של איברים ומקדם נתיבי ניקוי רעלים טבעיים בכל הגוף.', 169.90, 'product.png'),

-- Cholesterol Management
(UUID(), 'DH9 - Cholesterol Control', 'DH9 - בקרת כולסטרול', 'Cholesterinum, Berberis Vulgaris, Natrum Muriaticum. Directly targets cholesterol deposits, reduces LDL and balances HDL levels. Controls and reduces triglycerides while balancing metabolism and supporting healthy digestion.', 'כולסטרינום, ברבריס וולגריס, נתרום מוריאטיקום. מכוון ישירות למרבצי כולסטרול, מפחית LDL ומאזן רמות HDL. שולט ומפחית טריגליצרידים תוך איזון מטבוליזם ותמיכה בעיכול בריא.', 169.90, 'product.png'),
(UUID(), 'DH18 - Memory Enhancement', 'DH18 - שיפור זיכרון', 'Lycopodium, Baryta Carbonica. Addresses Alzheimer''s disease and memory loss concerns. Supports cognitive function, mental clarity, and memory retention. Helps with age-related cognitive decline and promotes neuroplasticity.', 'ליקופודיום, בריטה קרבוניקה. מתמודד עם מחלת אלצהיימר ובעיות אובדן זיכרון. תומך בתפקוד קוגניטיבי, בהירות מנטלית ושמירת זיכרון. עוזר עם ירידה קוגניטיבית הקשורה לגיל ומקדם נוירופלסטיות.', 169.90, 'product.png'),
(UUID(), 'DH22 - Nrf2 Neuro Antioxidant', 'DH22 - נוגד חמצון נוירו Nrf2', 'Green Tea, Silybum Marianum, Punica Granatum, Coffea Cruda, Ginkgo Biloba, Olive Leaf Extract. Advanced neuroprotective formula for Friedreich''s Ataxia and Alport Syndrome. Activates Nrf2 pathways for cellular protection and neurological support.', 'תה ירוק, סיליבום מריאניום, פוניקה גרנטום, קפאה קרודה, גינקו בילובה, תמצית עלי זית. נוסחת הגנה נוירולוגית מתקדמת עבור אטקסיה של פרידרייך ותסמונת אלפורט. מפעיל נתיבי Nrf2 להגנת תא ותמיכה נוירולוגית.', 169.90, 'product.png'),

-- ADHD Support
(UUID(), 'DH27 - ADHD Comprehensive Support', 'DH27 - תמיכה מקיפה ב-ADHD', 'Personalized blend including Argentum Nitricum, Arsenicum Album, Baryta Carbonica, Lycopodium, Chamomilla, Coffea Cruda, and others. Addresses nervous, impulsive behavior, anxiety, restlessness, concentration difficulties, anger outbursts, and hyperactivity in children and adults.', 'תערובת מותאמת אישית הכוללת ארגנטום ניטריקום, ארסניקום אלבום, בריטה קרבוניקה, ליקופודיום, קמומילה, קפאה קרודה ואחרים. מתמודד עם התנהגות עצבנית ואימפולסיבית, חרדה, חוסר מנוחה, קשיי ריכוז, התפרצויות כעס והיפראקטיביות אצל ילדים ומבוגרים.', 169.90, 'product.png'),

-- Arthritis & Joint Support
(UUID(), 'DH19 - Arthritis Relief Formula', 'DH19 - נוסחת הקלה בדלקת פרקים', 'Bryonia, Colchicum, Ledum Palustre. Targets rheumatoid arthritis with focus on cold conditions and pain in elbows and knees. Reduces joint inflammation, stiffness, and provides natural pain relief for arthritic conditions.', 'בריוניה, קולצ׳יקום, לדום פלוסטר. מתמקד בדלקת מפרקים שיגרונית עם דגש על מצבי קור וכאב במרפקים וברכיים. מפחית דלקת מפרקים, נוקשות ומספק הקלת כאב טבעית למצבים דלקתיים.', 169.90, 'product.png'),
(UUID(), 'DH20 - Advanced Arthritis Support', 'DH20 - תמיכה מתקדמת בדלקת פרקים', 'Apis, Arnica, Caulophyllum, Ledum Palustre. Specialized for rheumatoid arthritis with pain in fingers, tender to touch, and migrating pain from hands and feet. Prevents progression and addresses root causes of inflammatory joint conditions.', 'אפיס, ארניקה, קאולופילום, לדום פלוסטר. מיוחד לדלקת מפרקים שיגרונית עם כאב באצבעות, רגיש למגע, וכאב נודד מידיים ורגליים. מונע התקדמות ומתמודד עם הגורמים השורשיים של מצבי מפרקים דלקתיים.', 169.90, 'product.png'),

-- Digestive Conditions
(UUID(), 'DH21 - IBS Complete Support', 'DH21 - תמיכה שלמה ב-IBS', 'Arsenicum Album, Carbo Vegetabilis, Lycopodium, Nux Vomica (with Apple Cider Vinegar and Licorice). Comprehensive support for IBS with diarrhea, vomiting, and gut spasms. Addresses digestive inflammation and promotes healthy gut function.', 'ארסניקום אלבום, קרבו וגטביליס, ליקופודיום, נוקס וומיקה (עם חומץ תפוחים וליקריץ). תמיכה מקיפה ב-IBS עם שלשול, הקאות ועווויי מעיים. מתמודד עם דלקת עיכול ומקדם תפקוד מעיים בריא.', 169.90, 'product.png'),

-- Skin Conditions
(UUID(), 'DH24 - Eczema Relief (Confidence Type)', 'DH24 - הקלה באקזמה (סוג ביטחון)', 'Sulphur, Petroleum, Calendula. For confident personality types with eczema. Addresses skin inflammation, dryness, and promotes healthy skin regeneration. Suitable for those who are generally confident but struggle with persistent skin issues.', 'סולפור, פטרוליום, קלנדולה. עבור סוגי אישיות בטוחים עם אקזמה. מתמודד עם דלקת עור, יובש ומקדם התחדשות עור בריאה. מתאים לאלה שבדרך כלל בטוחים בעצמם אך נאבקים עם בעיות עור מתמשכות.', 169.90, 'product.png'),
(UUID(), 'DH25 - Eczema Relief (Sensitive Type)', 'DH25 - הקלה באקזמה (סוג רגיש)', 'Anacardium Orientale, Iris Versicolor, Calendula. For low self-esteem individuals with night itching eczema. Addresses both the emotional component and physical symptoms of eczema, particularly nighttime exacerbations and confidence issues.', 'אנקארדיום אוריינטליס, איריס ורסיקולור, קלנדולה. עבור אנשים עם הערכה עצמית נמוכה עם גירוד לילי באקזמה. מתמודד הן עם המרכיב הרגשי והן עם התסמינים הפיזיים של אקזמה, במיוחד החמרות לילה ובעיות ביטחון.', 169.90, 'product.png'),

-- Specialized Products
(UUID(), 'DH12 - Growth & Vitality Support', 'DH12 - תמיכה בצמיחה וחיוניות', 'Human Growth Hormone (hGH) homeopathic preparation. Supports natural growth processes, energy enhancement, and youthful skin maintenance. Promotes healthy aging and vitality through natural growth factor stimulation.', 'הכנה הומאופתית של הורמון גדילה אנושי (hGH). תומך בתהליכי צמיחה טבעיים, שיפור אנרגיה ושמירה על עור צעיר. מקדם הזדקנות בריאה וחיוניות דרך גירוי טבעי של גורמי צמיחה.', 169.90, 'product.png'),

-- Copper Tape Series
(UUID(), 'DH14 - Copper Tape 50mm', 'DH14 - סרט נחושת 50מ״מ', 'Medical grade copper tape, 50mm width. Natural antimicrobial properties, supports energy flow and electromagnetic balance. Can be used for therapeutic applications and energy healing practices.', 'סרט נחושת רפואי, רוחב 50מ״מ. תכונות אנטימיקרוביאליות טבעיות, תומך בזרימת אנרגיה ואיזון אלקטרומגנטי. ניתן לשימוש ביישומים טיפוליים ופרקטיקות ריפוי אנרגטי.', 89.90, 'product.png'),
(UUID(), 'DH15 - Copper Tape 100mm', 'DH15 - סרט נחושת 100מ״מ', 'Medical grade copper tape, 100mm width. Enhanced coverage for larger treatment areas. Natural antimicrobial properties with broader application potential for therapeutic and energy healing purposes.', 'סרט נחושת רפואי, רוחב 100מ״מ. כיסוי מוגבר לאזורי טיפול גדולים יותר. תכונות אנטימיקרוביאליות טבעיות עם פוטנציאל יישום רחב יותר למטרות טיפוליות וריפוי אנרגטי.', 129.90, 'product.png'),
(UUID(), 'DH16 - Copper Tape 300mm', 'DH16 - סרט נחושת 300מ״מ', 'Medical grade copper tape, 300mm width. Professional grade for extensive treatment areas. Provides maximum coverage for large-scale therapeutic applications and comprehensive energy balancing treatments.', 'סרט נחושת רפואי, רוחב 300מ״מ. דרגה מקצועית לאזורי טיפול נרחבים. מספק כיסוי מקסימלי ליישומים טיפוליים בקנה מידה גדול וטיפולי איזון אנרגטי מקיפים.', 199.90, 'product.png'),
(UUID(), 'DH17 - Copper Tape 600mm', 'DH17 - סרט נחושת 600מ״מ', 'Medical grade copper tape, 600mm width. Premium professional grade for maximum therapeutic coverage. Ideal for comprehensive treatment protocols and advanced energy healing applications.', 'סרט נחושת רפואי, רוחב 600מ״מ. דרגה מקצועית פרמיום לכיסוי טיפולי מקסימלי. אידיאלי לפרוטוקולי טיפול מקיפים ויישומי ריפוי אנרגטי מתקדמים.', 299.90, 'product.png'),

-- Services
(UUID(), 'DH10 - Iridology Reading', 'DH10 - קריאת אירידולוגיה', 'Professional iridology consultation and analysis. Comprehensive eye examination to assess overall health patterns, identify potential health concerns, and provide personalized health insights based on iris characteristics and markings.', 'יעוץ ואבחון אירידולוגיה מקצועי. בדיקת עיניים מקיפה להערכת דפוסי בריאות כלליים, זיהוי דאגות בריאותיות פוטנציאליות, ומתן תובנות בריאות מותאמות אישית על בסיס מאפיינים וסימנים באירית.', 299.90, 'consultation.png'),
(UUID(), 'DH11 - Professional Consultation', 'DH11 - יעוץ מקצועי', 'Comprehensive health consultation and appointment with qualified natural health practitioner. Includes personalized assessment, treatment planning, and ongoing support for your natural health journey.', 'יעוץ בריאות מקיף ופגישה עם מטפל מוסמך ברפואה טבעית. כולל הערכה מותאמת אישית, תכנון טיפול ותמיכה מתמשכת למסע הבריאות הטבעית שלך.', 399.90, 'consultation.png');


-- Articles table (bilingual subtitles and content)
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  title_he TEXT NOT NULL,
  subtitle_he TEXT,
  content TEXT NOT NULL,
  content_he TEXT NOT NULL,
  imageName VARCHAR(255),
  is_published TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at_articles (created_at)
);

-- Ensure subtitle columns exist for older schemas
SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
              WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'articles' AND COLUMN_NAME = 'subtitle');
SET @sql := IF(@cnt = 0, 'ALTER TABLE articles ADD COLUMN subtitle TEXT AFTER title', 'SELECT "subtitle exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @cnt := (SELECT COUNT(*) FROM information_schema.COLUMNS
              WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'articles' AND COLUMN_NAME = 'subtitle_he');
SET @sql := IF(@cnt = 0, 'ALTER TABLE articles ADD COLUMN subtitle_he TEXT AFTER title_he', 'SELECT "subtitle_he exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Seed a default article (idempotent: only inserts when articles table is empty)
SET @cnt := (SELECT COUNT(*) FROM articles);
SET @sql := IF(@cnt = 0,
  CONCAT(
    'INSERT INTO articles (id, title, subtitle, title_he, subtitle_he, content, content_he, imageName, is_published) VALUES ("',
    UUID(),
    '", ', QUOTE('Our Story'), ', ', QUOTE('Natural remedies & care'), ', ', QUOTE('הסיפור שלנו'), ', ', QUOTE('רפואות טבעיות וטיפוח'), ', ',
    QUOTE('Welcome to DHnaturally — our mission is to provide natural, evidence-informed remedies and educational content to support holistic wellbeing. Stay tuned for more articles and product spotlights.'), ', ',
    QUOTE('ברוכים הבאים ל-DHnaturally — המשימה שלנו היא לספק תרופות טבעיות ומבוססות ראיות ותכנים חינוכיים לתמיכה ברווחה הוליסטית. הישארו מעודכנים למאמרים והצגת מוצרים נוספים.'), ', ', QUOTE('article.png'), ', 1)'
  ),
  'SELECT "articles already seeded"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add slug column to articles (idempotent) and populate for existing rows.
SET @slug_col := (SELECT COUNT(*) FROM information_schema.COLUMNS
                   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'articles' AND COLUMN_NAME = 'slug');
SET @sql := IF(@slug_col = 0, 'ALTER TABLE articles ADD COLUMN slug VARCHAR(255) NULL AFTER imageName', 'SELECT "slug exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Populate slug for existing rows (simple, portable approximation):
-- Lowercase the title and replace spaces with hyphens. This keeps the SQL compatible
-- with MySQL < 8. It does NOT strip punctuation or transliterate non-Latin characters.
-- For robust slug generation (strip punctuation, collapse multiple non-alphanumerics,
-- handle Hebrew/diacritics) run the Node migration script included in the repo or use
-- MySQL 8+ REGEXP_REPLACE in a controlled migration.
-- Temporarily disable safe update mode so this migration can update rows that
-- don't include a key-equals-value predicate (MySQL Workbench often enables
-- SQL_SAFE_UPDATES which causes Error 1175). We save and restore the setting.
SET @__old_sql_safe_updates := @@sql_safe_updates;
SET SQL_SAFE_UPDATES = 0;

UPDATE articles
SET slug = TRIM(BOTH '-' FROM REPLACE(LOWER(IFNULL(title, '')), ' ', '-'))
WHERE slug IS NULL OR slug = '';

-- Restore the previous safe-updates setting
SET SQL_SAFE_UPDATES = @__old_sql_safe_updates;

-- If you need more advanced slugification (strip punctuation, transliterate non-latin chars),
-- run a Node script that reads titles and writes slugs using a library like `slugify`.


DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` tinyint DEFAULT NULL,
  `isActive` TINYINT(1) DEFAULT 1,
  `emailVerified` TINYINT(1) DEFAULT 0,
  `lastLogin` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (id, firstName, lastName, email, password, roleId) VALUES ('1f92104f-aa05-42fb-8106-6e4c4810d29a','Admin','Admin','admin@admin.com','de263117e819b59ca59abc8a50afd05598035acdd49f5041c5c99a03f93d8656757c35829567c3c2c1bf01c5ee888a203c282b49415ae88508baa5f1f71586f8',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
