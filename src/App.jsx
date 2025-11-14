import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  Award,
  Quote,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Sparkles,
  MessageCircle,
  Calendar,
  MapPinned,
} from "lucide-react";

// Configuration du site
const SITE_CONFIG = {
  images: {
    logo: "https://i.imgur.com/c1SSmUB.jpeg",
    favicon: "https://i.imgur.com/c1SSmUB.jpeg",
  },

  getImageUrl: (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("data:")) {
      return url;
    }
    return `/images/projets/${url}`;
  },
};

// Données du site enrichies pour le SEO
const SITE_DATA = {
  company: {
    name: "BAFAGA",
    legalName: "BAFAGA Services",
    tagline: "Excellence & Confiance",
    description:
      "Entreprise de services polyvalente en Côte d'Ivoire : BTP, décoration, ménage, jardinage et transport. Services professionnels et fiables à Abidjan et partout en Côte d'Ivoire.",
    shortDescription:
      "Votre partenaire de confiance pour tous vos projets de services en Côte d'Ivoire.",
    phone: "+2250709857214",
    formattedPhone: "+225 07 09 85 72 14",
    email: "contact@bafaga.ci",
    address: "Abidjan, Côte d'Ivoire",
    years: "5+",
    foundingDate: "2019",
    areaServed: "Côte d'Ivoire, Abidjan et régions",
  },

  services: [
    {
      id: "btp",
      title: "BTP & Construction",
      description:
        "Construction, rénovation, maçonnerie et tous travaux de bâtiment en Côte d'Ivoire",
      seoDescription:
        "Entreprise de BTP et construction en Côte d'Ivoire. Rénovation, maçonnerie, travaux de bâtiment. Devis gratuit pour vos projets de construction à Abidjan.",
      icon: "🏗️",
      color: "#FF6B6B",
      features: [
        "Plans architecturaux",
        "Suivi de chantier",
        "Matériaux qualité",
      ],
      whatsappMessage:
        "Bonjour, je suis intéressé par vos services de BTP & Construction. Pouvez-vous me renseigner ?",
      keywords: [
        "BTP Côte d'Ivoire",
        "construction Abidjan",
        "rénovation bâtiment",
        "maçonnerie",
      ],
    },
    {
      id: "decoration",
      title: "Décoration Intérieure",
      description:
        "Aménagement, design d'intérieur et décoration sur mesure à Abidjan",
      seoDescription:
        "Service de décoration intérieure et design d'intérieur à Abidjan. Aménagement sur mesure pour maisons, appartements et bureaux en Côte d'Ivoire.",
      icon: "🎨",
      color: "#4ECDC4",
      features: [
        "Conseil en design",
        "Choix des matériaux",
        "Installation complète",
      ],
      whatsappMessage:
        "Bonjour, je suis intéressé par vos services de Décoration Intérieure. Pouvez-vous me renseigner ?",
      keywords: [
        "décoration intérieure Abidjan",
        "design d'intérieur",
        "aménagement maison",
      ],
    },
    {
      id: "menage",
      title: "Services de Ménage",
      description:
        "Nettoyage résidentiel et commercial, entretien régulier professionnel",
      seoDescription:
        "Service de ménage professionnel à Abidjan. Nettoyage résidentiel et commercial, entretien régulier avec produits écologiques en Côte d'Ivoire.",
      icon: "🧹",
      color: "#95E1D3",
      features: [
        "Équipements professionnels",
        "Produits écologiques",
        "Flexibilité horaire",
      ],
      whatsappMessage:
        "Bonjour, je suis intéressé par vos services de Ménage. Pouvez-vous me renseigner ?",
      keywords: [
        "ménage Abidjan",
        "nettoyage professionnel",
        "femme de ménage",
      ],
    },
    {
      id: "jardinage",
      title: "Jardinage & Espaces Verts",
      description:
        "Entretien de jardins, paysagisme et aménagement extérieur à Abidjan",
      seoDescription:
        "Service de jardinage et paysagisme à Abidjan. Entretien d'espaces verts, création de jardins et aménagement extérieur en Côte d'Ivoire.",
      icon: "🌿",
      color: "#38A169",
      features: [
        "Paysagisme créatif",
        "Entretien régulier",
        "Plantes adaptées",
      ],
      whatsappMessage:
        "Bonjour, je suis intéressé par vos services de Jardinage. Pouvez-vous me renseigner ?",
      keywords: ["jardinage Abidjan", "paysagiste", "entretien espaces verts"],
    },
    {
      id: "transport",
      title: "Transport & Livraison",
      description:
        "Services de transport, déménagement et livraison en Côte d'Ivoire",
      seoDescription:
        "Service de transport et livraison à Abidjan. Déménagement, transport de marchandises et livraison rapide dans toute la Côte d'Ivoire.",
      icon: "🚛",
      color: "#F6AD55",
      features: [
        "Véhicules adaptés",
        "Personnel expérimenté",
        "Respect des délais",
      ],
      whatsappMessage:
        "Bonjour, je suis intéressé par vos services de Transport. Pouvez-vous me renseigner ?",
      keywords: [
        "transport Abidjan",
        "déménagement",
        "livraison Côte d'Ivoire",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Immeuble Résidentiel Cocody",
      category: "BTP & Construction",
      location: "Cocody, Abidjan",
      date: "2024",
      description:
        "Construction d'un immeuble résidentiel moderne de standing à Cocody",
      seoDescription:
        "Construction d'un immeuble résidentiel haut standing à Cocody, Abidjan. Réalisation BAFAGA en BTP et construction immobilière.",
      image: "https://i.imgur.com/2QFZy7N.jpeg",
      fallbackEmoji: "🏢",
      color: "#FF6B6B",
      tags: ["Construction", "Luxe", "Villa", "Résidentiel"],
    },
    {
      id: 7,
      title: "Immeuble Résidentiel Marcory R+4",
      category: "BTP & Construction",
      location: "Marcory, Abidjan",
      date: "2024",
      description:
        "Construction d'un immeuble R+4 avec 12 appartements haut standing à Marcory",
      seoDescription:
        "Construction immeuble R+4 avec 12 appartements standing à Marcory, Abidjan. Projet BTP réalisé par BAFAGA en Côte d'Ivoire.",
      image: "https://i.imgur.com/nw77rAE.jpeg",
      fallbackEmoji: "🏢",
      color: "#FF6B6B",
      tags: ["Immeuble", "Résidentiel", "R+4", "Appartements"],
    },
    {
      id: 2,
      title: "Bureau Design Plateau",
      category: "Décoration Intérieure",
      location: "Plateau, Abidjan",
      date: "2024",
      description:
        "Aménagement complet d'un espace bureau moderne pour une startup tech au Plateau",
      seoDescription:
        "Aménagement et décoration de bureau moderne pour startup au Plateau, Abidjan. Design d'intérieur professionnel par BAFAGA.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      fallbackEmoji: "💼",
      color: "#4ECDC4",
      tags: ["Design", "Bureau", "Moderne", "Startup"],
    },
    {
      id: 3,
      title: "Villa Contemporaine Marcory",
      category: "BTP & Construction",
      location: "Marcory, Abidjan",
      date: "2023",
      description:
        "Construction d'une villa contemporaine avec piscine à Marcory",
      seoDescription:
        "Construction villa contemporaine avec piscine à Marcory, Abidjan. Réalisation BAFAGA en construction résidentielle de luxe.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
      fallbackEmoji: "🏠",
      color: "#FF6B6B",
      tags: ["Villa", "Contemporain", "Piscine", "Luxe"],
    },
    {
      id: 4,
      title: "Restaurant Le Jardin Riviera",
      category: "Décoration Intérieure",
      location: "Riviera, Abidjan",
      date: "2023",
      description:
        "Décoration et aménagement d'un restaurant gastronomique avec terrasse à la Riviera",
      seoDescription:
        "Décoration restaurant gastronomique avec terrasse à Riviera, Abidjan. Aménagement intérieur par BAFAGA spécialiste décoration Côte d'Ivoire.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
      fallbackEmoji: "🍽️",
      color: "#4ECDC4",
      tags: ["Restaurant", "Terrasse", "Décoration", "Gastronomique"],
    },
    {
      id: 5,
      title: "Parc Corporate Yopougon",
      category: "Jardinage",
      location: "Yopougon, Abidjan",
      date: "2024",
      description:
        "Création et entretien des espaces verts d'un complexe d'entreprises à Yopougon",
      seoDescription:
        "Aménagement paysager et entretien espaces verts pour complexe d'entreprises à Yopougon, Abidjan. Service jardinage BAFAGA.",
      image:
        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=500&h=300&fit=crop",
      fallbackEmoji: "🌳",
      color: "#38A169",
      tags: ["Paysagisme", "Corporate", "Entretien", "Espaces verts"],
    },
  ],

  stats: [
    {
      number: "500+",
      label: "Clients satisfaits",
      icon: Users,
      color: "#FF6B6B",
    },
    {
      number: "5+",
      label: "Années d'expérience",
      icon: Clock,
      color: "#4ECDC4",
    },
    {
      number: "100%",
      label: "Satisfaction client",
      icon: Star,
      color: "#F6AD55",
    },
    { number: "24/7", label: "Support client", icon: Shield, color: "#38A169" },
  ],

  testimonials: [
    {
      id: 1,
      name: "Marie Kouassi",
      service: "Décoration",
      text: "Excellent travail de décoration. Mon salon a été transformé au-delà de mes attentes !",
      rating: 5,
      avatar: "👩🏾",
    },
    {
      id: 2,
      name: "Jean-Claude Brou",
      service: "BTP",
      text: "Construction de ma terrasse réalisée dans les délais. Équipe professionnelle et compétente.",
      rating: 5,
      avatar: "👨🏾",
    },
    {
      id: 3,
      name: "Fatou Traoré",
      service: "Ménage",
      text: "Service de ménage impeccable et ponctuel. Je recommande vivement Bafaga !",
      rating: 5,
      avatar: "👩🏾",
    },
  ],

  features: [
    {
      title: "Qualité Garantie",
      description:
        "Nous utilisons uniquement des matériaux et équipements de haute qualité",
      icon: Award,
      color: "#FF6B6B",
    },
    {
      title: "Prix Transparents",
      description: "Devis détaillés sans frais cachés",
      icon: CheckCircle,
      color: "#4ECDC4",
    },
    {
      title: "Équipe Certifiée",
      description: "Professionnels expérimentés et formés",
      icon: Users,
      color: "#F6AD55",
    },
    {
      title: "Support 24/7",
      description: "Assistance continue pour tous vos projets",
      icon: Shield,
      color: "#38A169",
    },
  ],

  navigation: [
    { id: "accueil", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "projets", label: "Projets" },
    { id: "temoignages", label: "Témoignages" },
    { id: "contact", label: "Contact" },
  ],

  // Nouvelles données pour le SEO
  seo: {
    title:
      "BAFAGA - Services BTP, Décoration, Ménage, Jardinage & Transport en Côte d'Ivoire",
    description:
      "Entreprise de services polyvalente à Abidjan : BTP, construction, décoration intérieure, ménage professionnel, jardinage et transport. Devis gratuit et service qualité.",
    keywords:
      "BTP Côte d'Ivoire, construction Abidjan, décoration intérieure, ménage professionnel, jardinage, transport, entreprise services Abidjan, rénovation bâtiment",
    author: "BAFAGA Services",
    siteUrl: "https://bafaga.ci",
    locale: "fr_CI",
    twitterHandle: "@bafagaci",
  },
};

// Fonction WhatsApp
const openWhatsApp = (service = null) => {
  let message =
    "Bonjour BAFAGA, je souhaite obtenir des informations sur vos services.";
  if (service) message = service.whatsappMessage;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${SITE_DATA.company.phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

// Initialisation de la favicon améliorée
const initializeFavicon = () => {
  try {
    // Supprimer les favicons existantes
    const existingLinks = document.querySelectorAll(`
      link[rel="icon"],
      link[rel="shortcut icon"],
      link[rel="apple-touch-icon"],
      link[rel="apple-touch-icon-precomposed"]
    `);
    existingLinks.forEach((link) => link.remove());

    const faviconUrl = SITE_CONFIG.images.favicon;

    // Créer les différents types de favicons
    const faviconTypes = [
      { rel: "icon", type: "image/jpeg", sizes: "32x32" },
      { rel: "icon", type: "image/jpeg", sizes: "16x16" },
      { rel: "shortcut icon", type: "image/jpeg" },
      { rel: "apple-touch-icon", sizes: "180x180" },
    ];

    faviconTypes.forEach(({ rel, type, sizes }) => {
      const link = document.createElement("link");
      link.rel = rel;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      link.href = faviconUrl;
      document.head.appendChild(link);
    });

    // Vérification du chargement
    const img = new Image();
    img.onload = () => console.log("✅ Favicon chargée avec succès");
    img.onerror = () => {
      console.warn("⚠️ Favicon échouée, utilisation de secours");
      const fallback = document.createElement("link");
      fallback.rel = "icon";
      fallback.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ff6b6b"/><text x="50" y="60" text-anchor="middle" font-size="60" fill="white">B</text></svg>`;
      document.head.appendChild(fallback);
    };
    img.src = faviconUrl;
  } catch (error) {
    console.error("Erreur initialisation favicon:", error);
  }
};

// Initialisation SEO améliorée
const initializeSEO = () => {
  try {
    // Définir la langue
    document.documentElement.lang = "fr";

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = SITE_DATA.seo.description;

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = SITE_DATA.seo.keywords;

    // Author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement("meta");
      metaAuthor.name = "author";
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.content = SITE_DATA.seo.author;

    // Viewport (déjà généralement présent)
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement("meta");
      metaViewport.name = "viewport";
      metaViewport.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(metaViewport);
    }

    // Open Graph
    const ogTags = {
      "og:title": SITE_DATA.seo.title,
      "og:description": SITE_DATA.seo.description,
      "og:image": SITE_CONFIG.images.logo,
      "og:url": SITE_DATA.seo.siteUrl,
      "og:type": "website",
      "og:locale": SITE_DATA.seo.locale,
      "og:site_name": SITE_DATA.company.name,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    });

    // Twitter Card
    const twitterTags = {
      "twitter:card": "summary_large_image",
      "twitter:title": SITE_DATA.seo.title,
      "twitter:description": SITE_DATA.seo.description,
      "twitter:image": SITE_CONFIG.images.logo,
      "twitter:site": SITE_DATA.seo.twitterHandle,
      "twitter:creator": SITE_DATA.seo.twitterHandle,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    });

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = SITE_DATA.seo.siteUrl;

    console.log("✅ SEO initialisé avec succès");
  } catch (error) {
    console.error("Erreur initialisation SEO:", error);
  }
};

// Composant pour les données structurées (Schema.org)
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_DATA.company.name,
    legalName: SITE_DATA.company.legalName,
    description: SITE_DATA.company.description,
    url: SITE_DATA.seo.siteUrl,
    telephone: SITE_DATA.company.phone,
    email: SITE_DATA.company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_DATA.company.address,
      addressCountry: "CI",
    },
    areaServed: SITE_DATA.company.areaServed,
    foundingDate: SITE_DATA.company.foundingDate,
    founder: {
      "@type": "Person",
      name: "Fondateur BAFAGA",
    },
    serviceType: SITE_DATA.services.map((service) => service.title),
    services: SITE_DATA.services.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.seoDescription || service.description,
      provider: {
        "@type": "Organization",
        name: SITE_DATA.company.name,
      },
    })),
    review: SITE_DATA.testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
      },
      reviewBody: testimonial.text,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: SITE_DATA.testimonials.length.toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Composant Breadcrumb Schema
const BreadcrumbSchema = () => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_DATA.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_DATA.seo.siteUrl}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projets",
        item: `${SITE_DATA.seo.siteUrl}#projets`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${SITE_DATA.seo.siteUrl}#contact`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};

// Composant Header avec améliorations SEO
const Header = ({ isScrolled, isMenuOpen, setIsMenuOpen }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo-section">
              <div className="logo-icon">
                {!logoError ? (
                  <img
                    src={SITE_CONFIG.images.logo}
                    alt={`Logo ${SITE_DATA.company.name} - ${SITE_DATA.company.tagline}`}
                    className="logo-image"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="logo-fallback">🏠</div>
                )}
              </div>
            </div>

            <nav className="desktop-nav" aria-label="Navigation principale">
              {SITE_DATA.navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="nav-link"
                  aria-label={`Aller à la section ${item.label}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header-actions">
              <div className="header-cta">
                <a
                  href={`tel:${SITE_DATA.company.phone}`}
                  className="phone-link"
                  aria-label={`Appeler ${SITE_DATA.company.formattedPhone}`}
                >
                  <Phone size={18} />
                  <span className="cta-text">Appeler</span>
                </a>
                <button
                  className="whatsapp-link"
                  onClick={() => openWhatsApp()}
                  aria-label="Contactez-nous sur WhatsApp"
                >
                  <MessageCircle size={18} />
                  <span className="cta-text">WhatsApp</span>
                </button>
              </div>

              <button
                className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu-scroll">
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <span className="logo-icon">
                {!logoError ? (
                  <img
                    src={SITE_CONFIG.images.logo}
                    alt={`Logo ${SITE_DATA.company.name}`}
                    className="logo-image"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="logo-fallback">🏠</div>
                )}
              </span>
            </div>
          </div>

          <nav className="mobile-nav" aria-label="Navigation mobile">
            <div className="mobile-nav-section">
              <div className="mobile-nav-title">Navigation</div>
              {SITE_DATA.navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="mobile-nav-item"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Aller à ${item.label}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={18} />
                </a>
              ))}
            </div>

            <div className="mobile-nav-section">
              <div className="mobile-nav-title">Nos Services</div>
              <div className="mobile-services-list">
                {SITE_DATA.services.map((service) => (
                  <button
                    key={service.id}
                    className="mobile-service-card"
                    onClick={() => {
                      openWhatsApp(service);
                      setIsMenuOpen(false);
                    }}
                    style={{ borderLeftColor: service.color }}
                    aria-label={`Demander un devis pour ${service.title}`}
                  >
                    <div
                      className="mobile-service-icon"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <span aria-hidden="true">{service.icon}</span>
                    </div>
                    <div className="mobile-service-content">
                      <div className="mobile-service-title">
                        {service.title}
                      </div>
                      <div className="mobile-service-desc">
                        {service.description}
                      </div>
                    </div>
                    <ArrowRight
                      size={18}
                      className="mobile-service-arrow"
                      style={{ color: service.color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="mobile-contact-section">
            <div className="mobile-nav-title">Contact Rapide</div>
            <div className="mobile-contact-grid">
              <a
                href={`tel:${SITE_DATA.company.phone}`}
                className="mobile-contact-card phone"
                aria-label={`Appeler le ${SITE_DATA.company.formattedPhone}`}
              >
                <Phone size={24} />
                <div>
                  <div className="contact-label">Téléphone</div>
                  <div className="contact-value">Appeler</div>
                </div>
              </a>
              <button
                className="mobile-contact-card whatsapp"
                onClick={() => {
                  openWhatsApp();
                  setIsMenuOpen(false);
                }}
                aria-label="Nous contacter sur WhatsApp"
              >
                <MessageCircle size={24} />
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <div className="contact-value">Chat</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Composant HeroSection avec SEO amélioré
const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Construction",
    "Décoration",
    "Ménage",
    "Jardinage",
    "Transport",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>
              Entreprise certifiée depuis {SITE_DATA.company.years} ans
            </span>
          </div>
          <h1 id="hero-title" className="hero-title">
            Vos projets,
            <span className="hero-highlight"> notre expertise</span>
          </h1>
          <p className="hero-subtitle">{SITE_DATA.company.description}</p>
          <div className="hero-rotating" aria-live="polite">
            <span className="rotating-prefix">Spécialiste en </span>
            <span className="rotating-text">{texts[currentText]}</span>
          </div>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">
              Découvrir nos services
              <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn-secondary">
              Devis gratuit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant ServicesSection avec SEO amélioré
const ServicesSection = () => (
  <section id="services" className="services" aria-labelledby="services-title">
    <div className="container">
      <div className="section-header">
        <div className="section-badge">Nos Services</div>
        <h2 id="services-title" className="section-title">
          Des solutions complètes pour tous vos projets
        </h2>
        <p className="section-subtitle">
          Découvrez notre gamme de services professionnels
        </p>
      </div>

      <div className="services-grid">
        {SITE_DATA.services.map((service) => (
          <article
            key={service.id}
            className="service-card"
            itemScope
            itemType="https://schema.org/Service"
          >
            <div
              className="service-top"
              style={{ borderTopColor: service.color }}
            >
              <div
                className="service-icon"
                style={{ backgroundColor: `${service.color}15` }}
                aria-hidden="true"
              >
                <span style={{ fontSize: "2.5rem" }}>{service.icon}</span>
              </div>
              <h3 className="service-title" itemProp="name">
                {service.title}
              </h3>
            </div>
            <p className="service-desc" itemProp="description">
              {service.description}
            </p>
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index} className="service-feature">
                  <CheckCircle size={16} style={{ color: service.color }} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="service-cta"
              style={{ backgroundColor: service.color }}
              onClick={() => openWhatsApp(service)}
              aria-label={`Demander un devis pour ${service.title}`}
            >
              Demander un devis
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// Composant ProjectImageDisplay avec SEO amélioré
const ProjectImageDisplay = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const imageUrl = SITE_CONFIG.getImageUrl(project.image);

  const handleImageError = () => {
    setImgError(true);
    setImgLoading(false);
  };

  const handleImageLoad = () => {
    setImgLoading(false);
  };

  const retryLoad = () => {
    setImgError(false);
    setImgLoading(true);
  };

  return (
    <div
      className="project-image"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {!imgError ? (
        <>
          {imgLoading && (
            <div className="image-loading">
              <div className="loading-spinner"></div>
              <p>Chargement de l'image...</p>
            </div>
          )}
          <img
            src={imageUrl}
            alt={`Projet ${project.title} - ${project.description}`}
            className={`project-img ${imgLoading ? "loading" : "loaded"}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      ) : (
        <div
          className="project-fallback"
          style={{ backgroundColor: `${project.color}20` }}
        >
          <span className="project-emoji" aria-hidden="true">
            {project.fallbackEmoji}
          </span>
          <p className="fallback-text">Image non disponible</p>
          <button
            className="retry-button"
            onClick={(e) => {
              e.stopPropagation();
              retryLoad();
            }}
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
};

// Composant ImageModal avec SEO amélioré
const ImageModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const imageUrl = SITE_CONFIG.getImageUrl(project.image);

  return (
    <div
      className="image-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="image-modal-close"
          onClick={onClose}
          aria-label="Fermer la modale"
        >
          <X size={32} />
        </button>
        <div className="image-modal-body">
          <img
            src={imageUrl}
            alt={`Projet ${project.title} - Vue détaillée`}
            className="image-modal-img"
          />
          <div className="image-modal-info">
            <h3 id="modal-title">{project.title}</h3>
            <p>{project.description}</p>
            <p className="image-modal-location">
              <MapPinned size={16} /> {project.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant ProjectsSection avec SEO amélioré
const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);
  const categories = [
    "Tous",
    ...new Set(SITE_DATA.projects.map((p) => p.category)),
  ];

  const filteredProjects =
    selectedCategory === "Tous"
      ? SITE_DATA.projects
      : SITE_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projets" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Nos Réalisations</div>
          <h2 id="projects-title" className="section-title">
            Projets réalisés avec succès
          </h2>
          <p className="section-subtitle">
            Découvrez quelques-uns de nos projets terminés
          </p>
        </div>

        <div
          className="projects-filters"
          role="tablist"
          aria-label="Filtrer les projets par catégorie"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
              role="tab"
              aria-selected={selectedCategory === cat}
              aria-controls="projects-grid"
            >
              {cat}
            </button>
          ))}
        </div>

        <div id="projects-grid" className="projects-grid" role="tabpanel">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <ProjectImageDisplay
                project={project}
                onClick={() => setSelectedProject(project)}
              />
              <div className="project-content">
                <div className="project-meta">
                  <span
                    className="project-category"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                  <span className="project-date">
                    <Calendar size={14} />
                    {project.date}
                  </span>
                </div>
                <h3 className="project-title" itemProp="name">
                  {project.title}
                </h3>
                <p className="project-description" itemProp="description">
                  {project.description}
                </p>
                <div className="project-location">
                  <MapPinned size={16} />
                  <span itemProp="location">{project.location}</span>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag" itemProp="keywords">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ImageModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

// Composant StatsSection avec SEO amélioré
const StatsSection = () => (
  <section id="avantages" className="stats" aria-labelledby="stats-title">
    <div className="container">
      <div className="stats-grid">
        {SITE_DATA.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-item">
              <div
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}20` }}
                aria-hidden="true"
              >
                <IconComponent size={32} style={{ color: stat.color }} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// Composant TestimonialsSection avec SEO amélioré
const TestimonialsSection = () => (
  <section
    id="temoignages"
    className="testimonials"
    aria-labelledby="testimonials-title"
  >
    <div className="container">
      <div className="section-header">
        <div className="section-badge">Témoignages</div>
        <h2 id="testimonials-title" className="section-title">
          Ce que disent nos clients
        </h2>
      </div>

      <div className="testimonials-grid">
        {SITE_DATA.testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="testimonial-card"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="testimonial-header">
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.avatar}
              </div>
              <div className="testimonial-author">
                <div className="author-name" itemProp="author">
                  {testimonial.name}
                </div>
                <div className="author-service">{testimonial.service}</div>
              </div>
              <Quote size={24} className="quote-icon" aria-hidden="true" />
            </div>
            <div
              className="rating-stars"
              aria-label={`Note : ${testimonial.rating} sur 5 étoiles`}
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="star-filled"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="testimonial-text" itemProp="reviewBody">
              "{testimonial.text}"
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// Composant ContactSection avec SEO amélioré
const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedService = SITE_DATA.services.find(
      (s) => s.id === formData.service
    );
    const serviceName = selectedService
      ? selectedService.title
      : "Service non spécifié";
    const whatsappMessage = `Nouvelle demande de devis:\nNom: ${formData.prenom} ${formData.nom}\nEmail: ${formData.email}\nTéléphone: ${formData.telephone}\nService: ${serviceName}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${SITE_DATA.company.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-header">
              <div className="section-badge">Contact</div>
              <h2 id="contact-title" className="section-title">
                Prêt à démarrer ?
              </h2>
              <p className="section-subtitle">
                Contactez-nous pour un devis gratuit
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div
                  className="contact-icon"
                  style={{ backgroundColor: "#FF6B6B15" }}
                >
                  <Phone
                    size={24}
                    style={{ color: "#FF6B6B" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="contact-details">
                  <h4>Téléphone</h4>
                  <a
                    href={`tel:${SITE_DATA.company.phone}`}
                    itemProp="telephone"
                  >
                    {SITE_DATA.company.formattedPhone}
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div
                  className="contact-icon"
                  style={{ backgroundColor: "#4ECDC415" }}
                >
                  <Mail
                    size={24}
                    style={{ color: "#4ECDC4" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a
                    href={`mailto:${SITE_DATA.company.email}`}
                    itemProp="email"
                  >
                    {SITE_DATA.company.email}
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div
                  className="contact-icon"
                  style={{ backgroundColor: "#38A16915" }}
                >
                  <MapPin
                    size={24}
                    style={{ color: "#38A169" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="contact-details">
                  <h4>Adresse</h4>
                  <span itemProp="address">{SITE_DATA.company.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Prénom *"
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                  required
                  aria-required="true"
                />
                <input
                  type="text"
                  placeholder="Nom *"
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-row">
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  aria-required="true"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                />
              </div>

              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                required
                aria-required="true"
              >
                <option value="">Sélectionnez un service *</option>
                {SITE_DATA.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Décrivez votre projet *"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                aria-required="true"
              />

              <button type="submit" className="submit-btn">
                Envoyer ma demande
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Footer avec SEO amélioré
const Footer = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer
      className="footer"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              {!logoError ? (
                <img
                  src={SITE_CONFIG.images.logo}
                  alt={`Logo ${SITE_DATA.company.name}`}
                  className="footer-logo-image"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span aria-hidden="true">🏠</span>
              )}
            </div>
            <p className="footer-desc" itemProp="description">
              {SITE_DATA.company.shortDescription}
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                {SITE_DATA.services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => openWhatsApp(service)}
                      className="footer-link"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Navigation</h4>
              <ul>
                {SITE_DATA.navigation.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 <span itemProp="name">{SITE_DATA.company.name}</span>.
            Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Composant WhatsAppFloat
const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`whatsapp-float ${isVisible ? "visible" : ""}`}>
      <button
        className="whatsapp-button"
        onClick={() => openWhatsApp()}
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="whatsapp-text">WhatsApp</span>
      </button>
    </div>
  );
};

// Composant principal App
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initialiser la favicon et le SEO
    initializeFavicon();
    initializeSEO();

    // Définir le titre de la page
    document.title = SITE_DATA.seo.title;

    // Gestion du scroll
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Gestion du défilement lorsque le menu mobile est ouvert
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="app">
      {/* Données structurées pour le SEO */}
      <StructuredData />
      <BreadcrumbSchema />

      <Header
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />

      {/* Le CSS reste identique */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", -apple-system, sans-serif;
          color: #2d3748;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.3s;
        }

        .header.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .nav-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
          gap: 2rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 1001;
        }

        .logo-icon {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .logo-fallback {
          font-size: 2.5rem;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          border-radius: 8px;
          color: white;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 1001;
        }

        .header-cta {
          display: flex;
          gap: 0.75rem;
        }

        .phone-link,
        .whatsapp-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .phone-link {
          background: linear-gradient(135deg, #ff6b6b, #ff8787);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .whatsapp-link {
          background: #25d366;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .phone-link:hover,
        .whatsapp-link:hover {
          transform: translateY(-2px);
        }

        .desktop-nav {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #4a5568;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: #ff6b6b;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #4a5568;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s;
          z-index: 1002;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
          backdrop-filter: blur(4px);
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 400px;
          background: white;
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-menu-scroll {
          height: 100%;
          overflow-y: auto;
          padding: 1.5rem;
          padding-top: 100px;
        }

        .mobile-menu-header {
          padding: 0 0 1.5rem 0;
          border-bottom: 2px solid #f7fafc;
          margin-bottom: 1.5rem;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-logo .logo-icon {
          width: 60px;
          height: 60px;
        }

        .mobile-tagline {
          font-size: 0.75rem;
          color: #718096;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mobile-nav-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-nav-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 0.5rem;
          margin-bottom: 0.5rem;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          color: #2d3748;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          border-radius: 12px;
          background: white;
          border: 1px solid #e2e8f0;
        }

        .mobile-nav-item:hover {
          background: linear-gradient(135deg, #ff6b6b10, #4ecdc410);
          border-color: #ff6b6b;
          transform: translateX(4px);
        }

        .mobile-services-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-service-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-left: 4px solid;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          width: 100%;
        }

        .mobile-service-card:hover {
          background: #f7fafc;
          transform: translateX(4px);
        }

        .mobile-service-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .mobile-service-content {
          flex: 1;
        }

        .mobile-service-title {
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.25rem;
          font-size: 0.95rem;
        }

        .mobile-service-desc {
          font-size: 0.8rem;
          color: #718096;
        }

        .mobile-contact-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #f7fafc;
        }

        .mobile-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .mobile-contact-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s;
          border: 2px solid;
          cursor: pointer;
          background: white;
          text-decoration: none;
        }

        .mobile-contact-card.phone {
          color: #ff6b6b;
          border-color: #ff6b6b;
        }

        .mobile-contact-card.whatsapp {
          color: #25d366;
          border-color: #25d366;
        }

        .mobile-contact-card:hover {
          transform: translateY(-4px);
        }

        .contact-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .contact-value {
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* Hero Section */
        .hero {
          position: relative;
          padding: 160px 0 100px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 20% 30%,
            rgba(255, 107, 107, 0.2) 0%,
            transparent 50%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-highlight {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-rotating {
          margin-bottom: 3rem;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .rotating-prefix {
          margin-right: 0.5rem;
        }

        .rotating-text {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1.5rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: inline-block;
          min-width: 200px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          color: #1e40af;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: white;
          padding: 1.25rem 2.5rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: white;
          color: #1e40af;
        }

        /* Sections */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Services */
        .services {
          padding: 6rem 0;
          background: white;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s;
          border-top: 4px solid;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .service-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .service-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .service-desc {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .service-features {
          list-style: none;
          margin-bottom: 2.5rem;
        }

        .service-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #374151;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .service-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .service-cta:hover {
          transform: translateY(-2px);
        }

        /* Projects Section */
        .projects {
          padding: 6rem 0;
          background: #f8fafc;
        }

        .projects-filters {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 50px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:hover {
          border-color: #ff6b6b;
          color: #ff6b6b;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          color: white;
          border-color: transparent;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
          border: 1px solid #f1f5f9;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .project-image {
          position: relative;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f8fafc;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .project-img.loading {
          opacity: 0;
        }

        .project-img.loaded {
          opacity: 1;
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .image-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          z-index: 2;
        }

        .image-loading p {
          margin-top: 1rem;
          color: #64748b;
          font-size: 0.9rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff6b6b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .project-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 2rem;
          text-align: center;
        }

        .project-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.7;
        }

        .fallback-text {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .retry-button {
          padding: 0.5rem 1rem;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s;
        }

        .retry-button:hover {
          background: #ff5252;
          transform: translateY(-2px);
        }

        /* Image Modal */
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .image-modal-content {
          position: relative;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .image-modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 2001;
        }

        .image-modal-close:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .image-modal-body {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
          padding: 2rem;
          overflow-y: auto;
          max-height: 85vh;
        }

        .image-modal-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
        }

        .image-modal-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .image-modal-info h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .image-modal-info p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .image-modal-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #38a169;
          font-weight: 600;
        }

        .project-content {
          padding: 2rem;
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .project-category {
          font-weight: 700;
        }

        .project-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .project-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .project-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .project-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .project-tag {
          background: #f7fafc;
          color: #64748b;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Stats */
        .stats {
          padding: 6rem 0;
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        /* Testimonials */
        .testimonials {
          padding: 6rem 0;
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: #f8fafc;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
        }

        .testimonial-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ddd6fe, #c7d2fe);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .testimonial-author {
          flex: 1;
        }

        .author-name {
          font-weight: 700;
          color: #1e293b;
        }

        .author-service {
          color: #64748b;
          font-size: 0.875rem;
        }

        .quote-icon {
          color: #e2e8f0;
        }

        .rating-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .star-filled {
          color: #fbbf24;
          fill: currentColor;
        }

        .testimonial-text {
          color: #374151;
          line-height: 1.7;
          font-style: italic;
        }

        /* Contact */
        .contact {
          padding: 6rem 0;
          background: #f8fafc;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin: 2.5rem 0;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-details h4 {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .contact-details a,
        .contact-details span {
          color: #64748b;
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-details a:hover {
          color: #1e40af;
        }

        .contact-form-wrapper {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
          background: white;
          font-family: inherit;
        }

        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .submit-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1.25rem 2.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
        }

        /* Footer */
        .footer {
          background: #0f172a;
          color: white;
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .footer-logo-image {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 6px;
        }

        .footer-desc {
          color: #94a3b8;
          line-height: 1.6;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .footer-column h4 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          font-weight: 700;
        }

        .footer-column ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-column a,
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
          text-align: left;
        }

        .footer-column a:hover,
        .footer-link:hover {
          color: #60a5fa;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid #1e293b;
          color: #64748b;
          text-align: center;
        }

        /* WhatsApp Float */
        .whatsapp-float {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 900;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .whatsapp-float.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .whatsapp-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #25d366;
          color: white;
          padding: 0.875rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .whatsapp-button:hover {
          transform: translateY(-3px);
          background: #128c7e;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .header-cta .cta-text {
            display: none;
          }

          .phone-link,
          .whatsapp-link {
            padding: 0.6rem;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero {
            padding: 140px 0 80px;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .services-grid,
          .projects-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .stat-item {
            flex-direction: column;
            text-align: center;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .whatsapp-text {
            display: none;
          }

          .image-modal-body {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .logo-icon {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .mobile-menu {
            width: 90%;
          }

          .hero-badge {
            font-size: 0.75rem;
            padding: 0.5rem 1rem;
          }

          .btn-primary,
          .btn-secondary {
            padding: 1rem 1.5rem;
            font-size: 0.9rem;
          }

          .logo-icon {
            width: 50px;
            height: 50px;
          }

          .project-image {
            height: 200px;
          }

          .project-emoji {
            font-size: 3rem;
          }

          .image-modal-close {
            width: 40px;
            height: 40px;
            top: 1rem;
            right: 1rem;
          }

          .image-modal-info h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
