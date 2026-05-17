export type Category = "tech" | "films" | "series" | "avis";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  author: string;
  date: string;
  readingMinutes: number;
  cover: string;
  featured?: boolean;
}

export const categories: { slug: Category; label: string; description: string }[] = [
  { slug: "tech", label: "Tech", description: "Tests, comparatifs et analyses du monde de la tech." },
  { slug: "films", label: "Films", description: "Critiques de films, sorties cinéma et analyses." },
  { slug: "series", label: "Séries", description: "Nos coups de cœur séries et nouveautés streaming." },
  { slug: "avis", label: "Avis", description: "Nos avis tranchés sur la pop culture et la tech." },
];

export const articles: Article[] = [
  {
    slug: "meilleur-smartphone-2024",
    title: "Le meilleur smartphone de 2024 : notre verdict après 6 mois de test",
    excerpt:
      "iPhone, Galaxy, Pixel — nous avons utilisé les flagships pendant six mois. Voici celui qui mérite vraiment votre argent.",
    content: `Après six mois passés à jongler entre l'iPhone 15 Pro, le Galaxy S24 Ultra et le Pixel 8 Pro, un constat s'impose : la course aux specs n'a plus de sens. Tous les flagships filment en 4K, durent une journée et prennent de superbes photos.

## La photo : Google reprend la couronne
Le Pixel 8 Pro impressionne en basse lumière. Le traitement computationnel de Google fait des miracles, notamment en mode portrait. Apple reste meilleur en vidéo, Samsung gagne en zoom.

## L'autonomie : Samsung domine
Avec ses 5000 mAh, le S24 Ultra tient deux jours en usage modéré. L'iPhone reste à la traîne malgré l'iOS 17.

## Le verdict
Notre choix : le **Pixel 8 Pro** pour son rapport qualité/prix, ses 7 ans de mises à jour et son IA réellement utile au quotidien.`,
    category: "tech",
    tags: ["smartphone", "comparatif", "android", "ios"],
    author: "Alex Moreau",
    date: "2024-11-12",
    readingMinutes: 7,
    cover:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "dune-deuxieme-partie-critique",
    title: "Dune : Deuxième Partie — le chef-d'œuvre que la SF attendait",
    excerpt:
      "Denis Villeneuve signe une suite monumentale. Spectacle total, mise en scène inspirée : on en sort secoué.",
    content: `Trois ans après le premier volet, **Denis Villeneuve** revient avec une suite qui dépasse toutes les attentes. *Dune : Deuxième Partie* n'est pas qu'un blockbuster — c'est une expérience sensorielle.

## Une mise en scène hypnotique
Chaque plan est une peinture. Le combat dans l'arène, filmé en infrarouge noir et blanc, restera dans les mémoires comme l'une des scènes les plus marquantes de la décennie.

## Zendaya enfin centrale
Chani prend toute sa place. Son arc narratif, plus politique que romantique, surprend les lecteurs du roman.

## Verdict : 9/10
À voir absolument en IMAX. Hans Zimmer livre une partition à la hauteur de l'image.`,
    category: "films",
    tags: ["dune", "villeneuve", "science-fiction", "critique"],
    author: "Léa Dubois",
    date: "2024-11-08",
    readingMinutes: 5,
    cover:
      "https://images.unsplash.com/photo-1489599735734-79b4af4a3a8b?w=1600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "top-10-series-netflix-2024",
    title: "Top 10 des séries Netflix à binge-watcher en 2024",
    excerpt:
      "De thrillers psychologiques à des comédies générationnelles : notre sélection des incontournables Netflix.",
    content: `Netflix a frappé fort cette année. Voici nos 10 séries indispensables.

## 1. Ripley
L'adaptation noir et blanc du roman de Patricia Highsmith. Andrew Scott est glaçant.

## 2. Baby Reindeer
Phénomène inattendu : 7 épisodes, basée sur une histoire vraie. Bouleversant.

## 3. 3 Body Problem
Les créateurs de Game of Thrones adaptent Liu Cixin. SF ambitieuse et réussie.

## 4. Shōgun
Bon, c'est FX/Hulu, mais on triche un peu : c'est la série de l'année.

## 5–10
*One Piece live action*, *The Diplomat S2*, *Bodkin*, *Eric*, *Avatar*, *Griselda*.

Bon visionnage !`,
    category: "series",
    tags: ["netflix", "streaming", "top", "binge"],
    author: "Sam Karim",
    date: "2024-11-02",
    readingMinutes: 6,
    cover:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1600&q=80&auto=format&fit=crop",
    featured: false,
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getByCategory = (cat: Category) => articles.filter((a) => a.category === cat);
export const getRelated = (a: Article) =>
  articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
