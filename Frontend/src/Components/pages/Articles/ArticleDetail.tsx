import { JSX, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { ArrowLeft, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';
import "./ArticleDetail.css";

interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: number;
    publishedDate: string;
    imageUrl?: string;
    featured?: boolean;
    author?: string;
}

export function ArticleDetail(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [article, setArticle] = useState<Article | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Simple markdown to HTML converter
    const markdownToHtml = (markdown: string): string => {
        return markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            // Lists
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            // Wrap in paragraph tags
            .replace(/^([^<].*?)(?=<|$)/mg, '<p>$1</p>')
            // Clean up empty paragraphs
            .replace(/<p><\/p>/g, '')
            .replace(/<p><br><\/p>/g, '');
    };

    // Mock articles data - in a real app, this would come from an API
    const articles = useMemo(() => [
        {
            id: "similia-similibus-curenter",
            title: language === 'he' ? 'העיקרון ההומיאופתי של סימיליה סימיליבוס קורנטור - "דומה מרפא דומה"' : 'The Homeopathic Principle of Similia Similibus Curentur - "Like Cures Like"',
            excerpt: language === 'he' ? 'חקירה לעיקרון המרכזי של ההומיאופתיה, מערכת רפואית שהוקמה בסוף המאה ה-18 על ידי ד"ר סמואל האנמן' : 'An exploration into the central principle of homeopathy, a medical system founded in the late 18th century by Dr. Samuel Hahnemann',
            content: language === 'he' ? `
# העיקרון ההומיאופתי של סימיליה סימיליבוס קורנטור - "דומה מרפא דומה"

## מבוא
זוהי חקירה לעיקרון המרכזי של ההומיאופתיה, מערכת רפואית שהוקמה בסוף המאה ה-18 על ידי ד"ר סמואל האנמן. עיקרון זה מבוטא בלטינית כ"סימיליה סימיליבוס קורנטור" - "דומה מרפא דומה".

## מה המשמעות של "דומה מרפא דומה"?
בליבתו של העיקרון נאמר:
חומר שיכול לגרום לתסמינים מסוימים באדם בריא, יש לו פוטנציאל, כאשר הוא מוכן בדרך הומיאופתית ספציפית, לרפא תסמינים דומים באדם חולה.

### דוגמה:
קפה (קופאה קרודה) שנלקח בכמויות מוגזמות עלול לגרום לנדודי שינה, התרגשות יתר והתרגשות.

בהומיאופתיה, הכנה מרוכזת מאוד של קופאה קרודה משמשת לעיתים קרובות לטיפול בנדודי שינה, במיוחד כאשר היא נובעת ממוח פעיל מדי.

אז אותו חומר שמייצר תסמינים בבריאות יכול לעזור להקל עליהם במחלה כאשר הוא מתאים נכון.

## רקע היסטורי
האנמן, רופא גרמני, היה לא מרוצה משיטות הרפואה של זמנו.

תוך כדי תרגום טקסט רפואי, הוא ניסה עם קליפת קינכונה (מקור הקינין, המשמש נגד מלריה).

הוא הבחין שנטילת קינכונה בכמויות קטנות גורמת לתסמינים דומים למלריה: צמרמורות, חום וחולשה.

זה הוביל אותו לתובנה: תרופה עובדת על ידי חיקוי המחלה, לא על ידי התנגדות לה.

## מקבילות טבעיות לעיקרון
רעיון זה אינו ייחודי להומיאופתיה; קיימות מקבילות בטבע וברפואה:
**חיסון**: הכנסת צורה קטנה ומשונה של פתוגן כדי לעורר את הגנת הגוף.

**הרגשת אלרגיה**: מתן מינונים מבוקרים של האלרגן עצמו כדי להפחית רגישות.

**מקבילות צמחיות**: בצל (אליום ספה) גורם לעיניים לדמוע ולאף לרוץ. בהומיאופתיה, אליום ספה מוכן משמש להצטננויות עם אותו הפרשה מימית.

## רשימת 10 צמחי מרפא נפוצים המשמשים בעולם הרפואי תחת אותו עיקרון:
הנה רשימת 10 תרופות ידועות היטב הנגזרות מצמחים, יחד עם מקור הצמח והשימוש העיקרי:

1. **אספירין (חומצה אצטילסליצילית)** - מקליפת ערבה (סליקס spp.) - הקלה בכאב, אנטי-דלקתי, מוריד חום.
2. **דיגוקסין** - מצמח הדיגיטליס (דיגיטליס פורפוראה) - מטפל באי-ספיקת לב ובהפרעות קצב.
3. **מורפין** - מפרג האופיום (פפאבר סומניפרום) - משכך כאבים חזק.
4. **קינין** - מקליפת עץ הקינכונה (קינכונה spp.) - מטפל במלריה.
5. **פקסיטקסל (טקסול)** - מעץ האיפה השקט (טקסוס ברוויפוליה) - תרופת כימותרפיה לסרטן.
6. **אטרופין** - מצמח הבלה הרעילה (אטרופה בלדונה) - משמש להרחבת אישונים, טיפול בברדיקרדיה, וכנגד לרעלים מסוימים.
7. **קודאין** - מפרג האופיום (פפאבר סומניפרום) - הקלה בכאב, מדכא שיעול.
8. **וינקריסטין** - מצמח הקתרנתוס הרוזאוס (קתרנתוס רוזאוס) - כימותרפיה ללוקמיה ולסרטנים אחרים.
9. **אפדרין** - מצמח האפדרה (אפדרה סיניקה) - מברודילטור, מפחית גודש.
10. **קפאין** - מפולי קפה, עלי תה, אגוזי קולה - מגרה, משמש לערנות ולתרופות כאב ראש מסוימות.

ובכן, אל תשכחו את ארס הנחש המשמש לסינתזה של נשיכות נחש, המבוסס על אותן תכונות ארס נחש/נשיכת נחש.

## תפקידו של הפרט
ההומיאופתיה אינה רק על התסמין אלא על האדם כולו:
שני מטופלים עשויים להיות בעלי כאבי ראש, אבל אחד מרגיש טוב יותר באוויר צח, בעוד אחר מחמיר באור שמש.

התרופה נבחרת לא רק לשם מחלת אלא לביטוי הייחודי של התסמינים בפרט.

זה הופך את ההומיאופתיה לצורה מאוד אישית של רפואה.

## פוטנציה - הכנת התרופה
תרופות מוכנות באמצעות תהליך הנקרא דילול וסוקושן (ניעור אינטנסיבי).

רחוק מעבר לדילול רגיל, תהליך זה נאמין שמשחרר את דפוס האנרגיה של החומר, תוך הסרת ההשפעות הרעילות שלו.

זה מאפשר לתרופות לעבוד ברמה עדינה ואנרגטית, תוך עידוד יכולת הריפוי הטבעית של הגוף.

## ריפוי בהרמוניה
ההומיאופתיה אינה מדכאת תסמינים אלא עובדת איתם, מובילה את הגוף בחזרה לאיזון.

מחלה נתפסת כהפרעה בכוח החיוני.

תרופות פועלות כאות, דוחפות את המערכת לכיוון תיקון עצמי, במקום להכריע עליה.

## נקודות מפתח
"דומה מרפא דומה" הוא הבסיס של ההומיאופתיה. למרות שלא מודה בכך בגלוי, הוא משמש בעולם הרפואי סביבנו.

חומרים שמייצרים תסמינים בבריאות יכולים, כאשר הם מוכנים הומיאופתית, לעזור לרפא את אותם התסמינים במחלה.

ההומיאופתיה מטפלת בפרט, לא רק בתווית המחלה.

תרופות מוכנות בדרך שהופכת אותן לבטוחות ואנרגטיות בטבען.

המטרה היא לשחזר איזון ולעורר את אינטליגנציית הריפוי של הגוף עצמו.

## סיכום
העיקרון של סימיליה סימיליבוס קורנטור משקף חוק ריפוי עמוק: מה שמפריע יכול גם לשחזר, מה שפוגע במצב אחד יכול לרפא באחר. ההומיאופתיה מזמינה אותנו להסתכל מעבר לדיכוי התסמינים ובמקום זאת להקשיב לשפת הגוף - לטפל במחלה על ידי השתקפות הביטוי שלה.
            ` : `
# The Homeopathic Principle of Similia Similibus Curentur - "Like Cures Like"

## Introduction
This is an exploration into the central principle of homeopathy, a medical system founded in the late 18th century by Dr. Samuel Hahnemann. This principle is expressed in Latin as "Similia Similibus Curentur" - "like cures like."

## What Does "Like Cures Like" Mean?
At its core, the principle states:
A substance that can cause certain symptoms in a healthy person has the potential, when prepared in a specific homeopathic way, to cure similar symptoms in someone who is ill.

### Example:
Coffee (Coffea cruda) taken in excess may cause sleeplessness, over-excitement, and agitation.

In homeopathy, a highly diluted preparation of Coffea cruda is often used to treat insomnia, especially when it stems from an overactive mind.

So the same substance that produces symptoms in health can help relieve them in sickness when matched correctly.

## Historical Background
Hahnemann, a German physician, was dissatisfied with the medical practices of his time.

While translating a medical text, he experimented with Cinchona bark (source of quinine, used against malaria).

He noticed that taking Cinchona in small amounts caused symptoms similar to malaria: chills, fever, and weakness.

This led him to the insight: a remedy works by mimicking the illness, not by opposing it.

## Natural Parallels to the Principle
This idea isn't unique to homeopathy; parallels exist in nature and medicine:
**Vaccination**: Introducing a small, modified form of a pathogen to stimulate the body's defense.

**Allergy desensitization**: Giving controlled doses of the allergen itself to reduce sensitivity.

**Herbal parallels**: Onion (Allium cepa) makes the eyes water and nose run. In homeopathy, prepared Allium cepa is used for colds with the same watery discharge.

## List of 10 Common Herbs Used by the Medical World Under the Same Principle:
Here's a list of 10 well-known medicines derived from plants, along with the plant source and main use:

1. **Aspirin (Acetylsalicylic acid)** - from Willow bark (Salix spp.) - pain relief, anti-inflammatory, fever reducer.
2. **Digoxin** - from Foxglove (Digitalis purpurea) - treats heart failure and arrhythmias.
3. **Morphine** - from Opium poppy (Papaver somniferum) - powerful painkiller.
4. **Quinine** - from Cinchona tree bark (Cinchona spp.) - treats malaria.
5. **Paclitaxel (Taxol)** - from Pacific yew tree (Taxus brevifolia) - chemotherapy drug for cancer.
6. **Atropine** - from Deadly nightshade (Atropa belladonna) - used to dilate pupils, treat bradycardia, and as an antidote for certain poisons.
7. **Codeine** - from Opium poppy (Papaver somniferum) - pain relief, cough suppressant.
8. **Vincristine** - from Madagascar periwinkle (Catharanthus roseus) - chemotherapy for leukemia and other cancers.
9. **Ephedrine** - from Ephedra plant (Ephedra sinica) - bronchodilator, decongestant.
10. **Caffeine** - from Coffee beans, tea leaves, kola nuts - stimulant, used for alertness and some headache medications.

And let us not forget the snake venom used to synthesize snake bites, based on the same snake venom/snake bite properties.

## The Role of the Individual
Homeopathy is not only about the symptom but about the whole person:
Two patients may both have headaches, but one feels better in fresh air, while another worsens in sunlight.

The remedy is chosen not just for the disease name but for the unique expression of symptoms in the individual.

This makes homeopathy a highly personalized form of medicine.

## Potentization - Preparing the Remedy
Remedies are prepared through a process called dilution and succussion (vigorous shaking).

Far beyond ordinary dilution, this process is believed to release the energetic pattern of the substance, while removing its toxic effects.

This allows remedies to work on a subtle, energetic level, stimulating the body's innate healing capacity.

## Healing in Harmony
Homeopathy does not suppress symptoms but works with them, guiding the body back into balance.

Illness is viewed as a disturbance of the vital force.

Remedies act as a signal, nudging the system toward self-correction, rather than overpowering it.

## Key Takeaways
"Like cures like" is the foundation of homeopathy. Though not openly admitted to, it is used in the medical world around us.

Substances that produce symptoms in health can, when prepared homeopathically, help cure those same symptoms in disease.

Homeopathy treats the individual, not just the disease label.

Remedies are prepared in a way that makes them safe and energetic in nature.

The goal is to restore balance and stimulate the body's own healing intelligence.

## Conclusion
The principle of Similia Similibus Curentur reflects a profound law of healing: what disturbs can also restore, what harms in one state can heal in another. Homeopathy invites us to look beyond suppression of symptoms and instead to listen to the body's language - treating illness by mirroring its expression.
            `,
            category: "homeopathy",
            readTime: 12,
            publishedDate: "2024-01-20",
            featured: true,
            author: "DHnaturally Editorial Team",
            imageUrl: "/images/articles/homeopathy-principle.jpg"
        }
    ], [language]);

    useEffect(() => {
        const foundArticle = articles.find(a => a.id === id);
        if (foundArticle) {
            setArticle(foundArticle);
        } else {
            // Article not found, redirect to articles page
            navigate('/articles');
        }
    }, [id, navigate, articles]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article?.title,
                text: article?.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // In a real app, this would save to local storage or backend
    };

    if (!article) {
        return (
            <div className="article-detail-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="article-detail">
            <div className="container">
                {/* Back Button */}
                <div className="back-navigation">
                    <Button onClick={() => navigate('/articles')} className="back-button">
                        <ArrowLeft size={16} />
                        {language === 'he' ? 'חזרה למאמרים' : 'Back to Articles'}
                    </Button>
                </div>

                {/* Article Header */}
                <header className="article-header">
                    <div className="article-meta">
                        <span className="category-pill">
                            <Tag size={14} />
                            {t(`articles.category.${article.category}`, language)}
                        </span>
                        <span className="read-time">
                            <Clock size={14} />
                            {article.readTime} {t("articles.readTime", language)}
                        </span>
                        <span className="publish-date">
                            {new Date(article.publishedDate).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="article-title">{article.title}</h1>

                    {article.excerpt && (
                        <p className="article-excerpt">{article.excerpt}</p>
                    )}

                    {article.author && (
                        <div className="article-author">
                            <span>{language === 'he' ? 'מאת:' : 'By:'} {article.author}</span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="article-actions">
                        <Button onClick={handleShare} className="action-button">
                            <Share2 size={16} />
                            {language === 'he' ? 'שתף' : 'Share'}
                        </Button>
                        <Button onClick={handleBookmark} className={`action-button ${isBookmarked ? 'bookmarked' : ''}`}>
                            <Bookmark size={16} />
                            {language === 'he' ? 'שמור' : 'Bookmark'}
                        </Button>
                    </div>
                </header>

                {/* Article Image */}
                {article.imageUrl && (
                    <div className="article-image-container">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="article-image"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                        __html: markdownToHtml(article.content)
                    }}
                />

                {/* Article Footer */}
                <footer className="article-footer">
                    <div className="article-tags">
                        <span className="tags-label">{language === 'he' ? 'תגיות:' : 'Tags:'}</span>
                        <span className="tag">{t(`articles.category.${article.category}`, language)}</span>
                        <span className="tag">Homeopathy</span>
                        <span className="tag">Natural Medicine</span>
                    </div>

                    <div className="article-share">
                        <h4>{language === 'he' ? 'שתף מאמר זה' : 'Share this article'}</h4>
                        <div className="share-buttons">
                            <Button onClick={handleShare} className="share-button">
                                <Share2 size={16} />
                                {language === 'he' ? 'שתף' : 'Share'}
                            </Button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
