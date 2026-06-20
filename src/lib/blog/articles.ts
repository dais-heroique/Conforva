export interface BlogSection {
  heading?: string
  body: string[]
}

export interface BlogArticle {
  slug: string
  title: string
  description: string
  keywords: string[]
  publishedAt: string
  updatedAt?: string
  readingTime: number
  category: string
  intro: string
  sections: BlogSection[]
  conclusion: string
  cta: { heading: string; text: string; button: string; href: string }
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: "gpsr-guide-complet-ecommercants",
    title: "GPSR 2025 : guide complet pour les e-commerçants vendant dans l'UE",
    description: "Tout ce que vous devez savoir sur le règlement GPSR (UE) 2023/988 : qui est concerné, quelles obligations, quels documents, quelles sanctions. Guide pratique pour vendeurs en ligne.",
    keywords: ["GPSR e-commerçant", "règlement UE 2023/988", "conformité GPSR", "GPSR vendeur en ligne", "obligations GPSR"],
    publishedAt: "2025-01-15",
    readingTime: 8,
    category: "Réglementation",
    intro: "Depuis le 13 décembre 2024, le règlement (UE) 2023/988 sur la sécurité générale des produits — connu sous le nom de GPSR — est entré pleinement en application. Pour les e-commerçants vendant sur Amazon, Shopify, ou leur propre boutique, les règles ont changé de manière significative. Ce guide vous explique exactement ce que vous devez faire.",
    sections: [
      {
        heading: "Qu'est-ce que le GPSR exactement ?",
        body: [
          "Le GPSR (General Product Safety Regulation) est le règlement (UE) 2023/988, adopté le 10 mai 2023 et applicable depuis le 13 décembre 2024. Il remplace l'ancienne directive sur la sécurité générale des produits (2001/95/CE), qui datait de plus de 20 ans.",
          "Sa portée est considérable : il s'applique à tous les produits de consommation non alimentaires vendus dans l'Union Européenne, qu'ils soient vendus en magasin physique ou en ligne, et peu importe l'origine géographique du vendeur. Un dropshipper basé aux États-Unis ou en Chine, qui vend à des consommateurs français via Amazon ou Shopify, est soumis au GPSR.",
          "Le GPSR introduit également des obligations explicites pour les places de marché en ligne (Amazon, Etsy, OTTO, etc.) qui deviennent responsables de la conformité des vendeurs tiers sur leurs plateformes.",
        ],
      },
      {
        heading: "Qui est concerné par le GPSR ?",
        body: [
          "Le règlement distingue plusieurs rôles dans la chaîne de mise sur le marché, chacun avec ses propres obligations :",
          "**Le fabricant** : celui qui conçoit et produit le produit, ou qui le fait fabriquer et le commercialise sous sa marque. Il est responsable de l'intégralité de la conformité et doit établir le dossier technique et la déclaration de conformité.",
          "**L'importateur** : toute personne physique ou morale établie dans l'UE qui met sur le marché européen un produit fabriqué hors UE. Si vous importez des produits de Chine pour les vendre en Europe, vous êtes importateur.",
          "**Le distributeur** : toute personne de la chaîne d'approvisionnement qui met à disposition des produits sur le marché, à l'exception du fabricant et de l'importateur. Les dropshippers, même sans stock, sont généralement considérés comme distributeurs.",
          "**L'opérateur d'exécution** (nouveau dans le GPSR) : les prestataires logistiques type Amazon FBA qui stockent, emballent et expédient des produits pour le compte de tiers.",
        ],
      },
      {
        heading: "Les 5 documents obligatoires",
        body: [
          "Le GPSR impose plusieurs documents pour chaque produit mis sur le marché européen :",
          "**1. Le dossier technique (Article 22)** : le document central du GPSR. Il doit contenir la description complète du produit, ses dessins et plans techniques, la liste des normes appliquées, l'analyse de risque complète (méthodologie ISO 12100), les résultats de tests, les instructions d'utilisation et l'étiquetage. Il doit être conservé 10 ans à compter de la mise sur le marché.",
          "**2. L'analyse de risque** : partie intégrante du dossier technique, elle identifie chaque danger potentiel du produit (mécanique, thermique, électrique, chimique, etc.), évalue la probabilité et la gravité de chaque risque, et documente les mesures de mitigation mises en place.",
          "**3. La déclaration UE de conformité (Article 24)** : document officiel signé par le fabricant ou son représentant légal, attestant que le produit respecte toutes les exigences applicables. Elle doit être disponible à la demande des autorités.",
          "**4. L'étiquetage de sécurité (Article 9)** : les avertissements de sécurité doivent apparaître dans la langue du pays de vente. Pour un produit vendu en Allemagne, en France et en Italie, les étiquettes doivent être dans ces trois langues.",
          "**5. Les informations sur la Personne Responsable EU (Article 16)** : pour les fabricants établis hors UE, les coordonnées complètes de la personne responsable doivent figurer sur le produit ou son emballage.",
        ],
      },
      {
        heading: "La Personne Responsable EU : obligatoire pour tous les vendeurs hors UE",
        body: [
          "L'Article 16 du GPSR est souvent celui qui surprend le plus les vendeurs non-européens. Il impose que tout produit mis sur le marché EU par un fabricant hors UE ait un représentant légal établi dans l'Union Européenne.",
          "Cette personne — ou cette société — doit être joignable par les autorités de surveillance du marché européennes. Elle peut être un prestataire de services spécialisé, un importateur européen, ou même une société que vous créez en Europe.",
          "Pour les vendeurs Amazon FBA qui sourcent depuis la Chine, l'Asie du Sud-Est ou les États-Unis : Amazon EU exige déjà la désignation d'une personne responsable pour chaque ASIN vendu sur ses places de marché européennes (Amazon.fr, Amazon.de, Amazon.it, etc.). Sans cette désignation documentée, votre annonce peut être suspendue.",
        ],
      },
      {
        heading: "Sanctions et risques en cas de non-conformité",
        body: [
          "Les autorités de surveillance du marché européennes — la DGCCRF en France, le BSI en Allemagne, etc. — ont des pouvoirs renforcés sous le GPSR. Elles peuvent :",
          "Ordonner le retrait immédiat du produit du marché ou son rappel auprès des consommateurs. Bloquer les importations en douane si la documentation est absente ou insuffisante. Imposer des amendes administratives qui peuvent atteindre des montants significatifs selon la législation nationale de chaque État membre.",
          "Au-delà des sanctions réglementaires directes, la non-conformité entraîne des conséquences commerciales immédiates : suspension des annonces sur Amazon EU et les autres places de marché, blocage des livraisons, et en cas d'accident impliquant un produit non conforme, une responsabilité civile et pénale aggravée pour le vendeur.",
        ],
      },
      {
        heading: "Combien de temps pour constituer un dossier technique ?",
        body: [
          "Traditionnellement, constituer un dossier technique GPSR complet prenait entre 2 et 5 jours de travail pour un professionnel non spécialisé, ou nécessitait de faire appel à un expert en conformité (coût : 500 à 2 000 € par référence). Pour un catalogue de 50 produits, cela représentait un investissement de temps ou d'argent considérable.",
          "Avec des outils comme Conforva, le même dossier peut être généré en 5 à 10 minutes par référence : l'IA structure l'analyse de risque selon ISO 12100, identifie les normes harmonisées applicables, et génère les 15 sections requises du dossier technique. L'utilisateur n'a plus qu'à relire, compléter avec ses données réelles et signer.",
        ],
      },
    ],
    conclusion: "Le GPSR est une réalité depuis décembre 2024. Pour les e-commerçants qui vendent en Europe, la mise en conformité n'est plus optionnelle — c'est un prérequis pour opérer légalement sur le marché européen, maintenir ses annonces sur Amazon, et éviter des responsabilités en cas d'incident produit. La bonne nouvelle : les outils disponibles en 2025 rendent cette conformité accessible à tous, même sans expertise juridique ou technique préalable.",
    cta: {
      heading: "Générez votre premier dossier GPSR gratuitement",
      text: "Créez votre compte Conforva — aucune carte bancaire requise. Votre premier dossier technique complet est disponible immédiatement.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-amazon-fba-guide",
    title: "Amazon FBA et GPSR : ce que chaque vendeur doit savoir en 2025",
    description: "Amazon suspend les annonces sans conformité GPSR. Découvrez exactement ce qu'Amazon exige (personne responsable EU, dossier technique) et comment mettre vos ASINs en conformité rapidement.",
    keywords: ["GPSR Amazon FBA", "Amazon personne responsable EU", "suspension Amazon GPSR", "conformité Amazon Europe", "ASIN conformité GPSR"],
    publishedAt: "2025-02-10",
    readingTime: 7,
    category: "Amazon FBA",
    intro: "Si vous vendez sur Amazon.fr, Amazon.de, Amazon.it ou toute autre place de marché Amazon EU, le GPSR vous concerne directement. Amazon a commencé à suspendre les annonces non conformes dès le début 2025. Ce guide vous explique exactement ce qu'Amazon exige et comment y répondre efficacement.",
    sections: [
      {
        heading: "Pourquoi Amazon exige la conformité GPSR",
        body: [
          "Amazon EU n'est pas seulement tenu de respecter les lois européennes — le GPSR l'y oblige directement. En tant que place de marché, Amazon est désormais considéré comme un « opérateur de marché en ligne » au sens du règlement (UE) 2023/988. À ce titre, Amazon a l'obligation légale de s'assurer que les produits vendus sur sa plateforme respectent les exigences de sécurité.",
          "Concrètement, cela signifie qu'Amazon audite activement les annonces et peut suspendre un ASIN qui ne dispose pas de la documentation GPSR requise. Les vendeurs reçoivent en général une notification par email avec un délai de mise en conformité — mais parfois la suspension intervient sans préavis.",
        ],
      },
      {
        heading: "Ce qu'Amazon exige concrètement",
        body: [
          "Amazon EU exige principalement deux éléments pour chaque ASIN dans les catégories concernées :",
          "**La désignation d'une Personne Responsable EU** : les coordonnées complètes (nom ou raison sociale, adresse physique dans un État membre de l'UE, numéro de téléphone et adresse email) doivent être renseignées dans Seller Central et, selon les catégories, figurer sur le produit ou son emballage. C'est souvent l'élément bloquant pour les vendeurs basés hors UE.",
          "**La documentation de conformité** : selon la catégorie du produit, Amazon peut demander à voir le dossier technique, les certificats de test, la déclaration de conformité ou des photos de l'étiquetage. Ces documents sont à uploader dans Seller Central dans la section « Compliance ».",
          "En pratique, Amazon vérifie en priorité les catégories à risque : jouets (EN 71), puériculture, électronique, articles pour enfants, éclairage, et tout produit pouvant entrer en contact avec des enfants de moins de 14 ans.",
        ],
      },
      {
        heading: "La Personne Responsable EU pour Amazon FBA : les options",
        body: [
          "Pour un vendeur basé hors de l'UE, trouver une personne responsable EU est souvent la première étape. Voici les options disponibles :",
          "**Option 1 — Un prestataire spécialisé** : il existe des sociétés qui proposent le service de « EU Responsible Person » pour les vendeurs Amazon non-européens. Les tarifs varient de 100 à 500 €/an par marque. Ces prestataires enregistrent leur adresse comme adresse de contact et redirigent les éventuelles demandes des autorités.",
          "**Option 2 — Votre importateur européen** : si vous travaillez avec un importateur ou un distributeur établi dans l'UE, celui-ci peut assumer ce rôle. Il doit toutefois être conscient des responsabilités légales associées.",
          "**Option 3 — Créer une entité en Europe** : pour les vendeurs qui ont un volume significatif, créer une SAS, SARL, GmbH ou autre forme juridique en Europe permet de gérer directement la conformité et la responsabilité.",
          "Quelle que soit l'option choisie, les coordonnées de la personne responsable doivent être à jour dans Seller Central et sur les produits concernés.",
        ],
      },
      {
        heading: "Les délais et conséquences d'une suspension Amazon",
        body: [
          "Une suspension ASIN pour non-conformité GPSR peut intervenir de plusieurs façons : vérification proactive d'Amazon, plainte d'un client, signalement d'un concurrent, ou contrôle d'une autorité nationale de surveillance du marché.",
          "Une fois un ASIN suspendu, la procédure de réactivation nécessite de soumettre la documentation demandée via Seller Central. Les délais de traitement par Amazon varient de quelques jours à plusieurs semaines selon les files d'attente. Pendant ce temps, l'annonce est invisible et les ventes à l'arrêt.",
          "La prévention reste donc de loin préférable au traitement des suspensions. Constituer son dossier GPSR avant d'être contacté par Amazon est la démarche recommandée.",
        ],
      },
      {
        heading: "Checklist GPSR pour chaque ASIN Amazon EU",
        body: [
          "Pour chaque référence produit vendue sur Amazon EU, vérifiez que vous disposez de :",
          "✓ Un dossier technique complet (15 sections, Art. 22 GPSR) conservé pendant 10 ans",
          "✓ Une analyse de risque documentée (ISO 12100:2010)",
          "✓ Une déclaration UE de conformité signée (Art. 24 GPSR)",
          "✓ Les coordonnées d'une Personne Responsable EU (Art. 16 GPSR) renseignées dans Seller Central",
          "✓ Un étiquetage avec avertissements de sécurité dans les langues des pays de vente (Art. 9 GPSR)",
          "✓ Un numéro de modèle, référence ou lot permettant l'identification du produit",
        ],
      },
    ],
    conclusion: "Le GPSR sur Amazon EU est une réalité opérationnelle depuis début 2025. La bonne approche est d'anticiper : constituer les dossiers GPSR pour chaque ASIN avant d'être contacté par Amazon. Avec des outils adaptés, cette conformité ne prend plus que quelques minutes par référence — et elle protège à la fois vos annonces et votre responsabilité légale.",
    cta: {
      heading: "Mettez vos ASINs Amazon en conformité",
      text: "Générez les dossiers techniques GPSR pour vos produits Amazon EU en quelques minutes. Analyse de risque, dossier 15 sections, déclaration de conformité et étiquetage multilingue.",
      button: "Essayer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "dossier-technique-gpsr-guide",
    title: "Dossier technique GPSR (Article 22) : les 15 sections obligatoires expliquées",
    description: "Le dossier technique GPSR est le document central de la conformité. Découvrez ce que l'Article 22 du règlement (UE) 2023/988 impose dans chaque section, et comment le constituer efficacement.",
    keywords: ["dossier technique GPSR", "article 22 GPSR", "créer dossier technique", "dossier technique conformité", "contenu dossier technique GPSR"],
    publishedAt: "2025-02-28",
    readingTime: 9,
    category: "Documentation",
    intro: "Le dossier technique est la pièce maîtresse de la conformité GPSR. L'Article 22 du règlement (UE) 2023/988 en définit précisément le contenu — et sa conservation est obligatoire pendant 10 ans à compter de la mise sur le marché. Voici ce qu'il doit contenir, section par section.",
    sections: [
      {
        heading: "Pourquoi le dossier technique est obligatoire",
        body: [
          "Le dossier technique (Technical Documentation) sert de preuve que le produit a fait l'objet d'une évaluation de conformité sérieuse avant sa mise sur le marché. Il est la documentation principale que les autorités de surveillance du marché (DGCCRF en France, BSI en Allemagne, etc.) peuvent réclamer à tout moment.",
          "Sa conservation pendant 10 ans est une obligation légale. En cas d'incident, un accident ou un rappel de produit, l'absence de dossier technique constitue une preuve d'imprudence qui aggrave considérablement la responsabilité civile et pénale du fabricant ou de l'importateur.",
          "Le dossier doit être disponible en français ou dans la langue de l'État membre où le produit est commercialisé — ou en anglais si les autorités l'acceptent (variable selon les pays).",
        ],
      },
      {
        heading: "Les 15 sections du dossier technique GPSR",
        body: [
          "**Section 1 — Description générale du produit** : nom commercial, référence, numéro de modèle, description fonctionnelle, photos, dimensions, poids, couleurs disponibles. Cette section permet d'identifier le produit de manière non ambiguë.",
          "**Section 2 — Nomenclature des composants (BOM)** : liste détaillée de tous les matériaux et composants constitutifs du produit, avec leurs fournisseurs et références. Essentielle pour les analyses de risque chimique et les enquêtes de traçabilité.",
          "**Section 3 — Dessins techniques et schémas** : plans, vues éclatées, schémas électriques si applicable. Ne doivent pas nécessairement être des dessins CAO professionnels — des schémas annotés peuvent suffire pour des produits simples.",
          "**Section 4 — Réglementations et normes appliquées** : liste des règlements EU applicables au produit (GPSR, REACH, RoHS, etc.) et des normes harmonisées retenues pour démontrer la conformité. Pour les jouets : EN 71 séries. Pour l'électronique : EN 62368. Pour les bougies : EN 15494.",
          "**Section 5 — Analyse de risque (ISO 12100:2010)** : le cœur du dossier. Identification systématique de tous les dangers (mécanique, thermique, électrique, chimique, biologique, ergonomique), évaluation de la probabilité et de la gravité de chaque risque, et documentation des mesures de mitigation. Cette section suit la méthodologie ISO 12100:2010.",
          "**Section 6 — Résultats d'essais ou justifications alternatives** : rapports de tests réalisés en laboratoire (accrédité ISO 17025 de préférence), ou, pour les produits à faible risque, une justification technique expliquant pourquoi les tests ne sont pas nécessaires.",
          "**Section 7 — Usage prévu et usages prévisibles raisonnables** : description de l'utilisation normale du produit, mais aussi des usages prévisibles non prévus (enfants jouant avec un produit destiné aux adultes, usage en conditions extrêmes, etc.).",
          "**Section 8 — Population cible** : identification des utilisateurs finaux, notamment les groupes vulnérables (enfants, personnes âgées, personnes handicapées). Les produits destinés aux enfants ou pouvant être accessibles à des enfants ont des exigences renforcées.",
          "**Section 9 — Instructions d'utilisation et avertissements** : guide d'utilisation, instructions de montage, conditions de stockage, précautions d'emploi. Doivent être rédigés dans la ou les langues du pays de vente.",
          "**Section 10 — Étiquetage de sécurité** : avertissements obligatoires selon la catégorie du produit (ex. : « Attention — ne pas avaler. Tenir hors de portée des enfants de moins de 3 ans »), symboles et pictogrammes CLP si applicable.",
          "**Section 11 — Personne Responsable EU** : coordonnées complètes de la personne ou société responsable au sens de l'Article 16 GPSR. Obligatoire pour les fabricants établis hors UE.",
          "**Section 12 — Traçabilité et informations de mise sur le marché** : informations permettant de tracer la chaîne de distribution du produit : fournisseur, importateur, distributeurs, numéros de lot.",
          "**Section 13 — Conformité aux marchés tiers (si applicable)** : pour les produits vendus en dehors de l'UE, documentation de la conformité aux exigences des marchés cibles (CPSC pour les USA, UKCA pour le Royaume-Uni, CCC pour la Chine, etc.).",
          "**Section 14 — Historique des versions et révisions** : journal des modifications du produit ou de la documentation depuis la première mise sur le marché, avec dates et description des changements.",
          "**Section 15 — Déclaration UE de Conformité (référence)** : référence ou copie de la déclaration de conformité (Art. 24 GPSR) associée à ce dossier technique.",
        ],
      },
      {
        heading: "Dossier technique et résultats de tests : faut-il obligatoirement un laboratoire ?",
        body: [
          "Les tests de laboratoire ne sont pas systématiquement obligatoires pour tous les produits. Le GPSR permet de recourir à des « justifications alternatives » pour démontrer la conformité sans tests externes.",
          "Cependant, pour certaines catégories à risque élevé, les normes harmonisées imposent des tests spécifiques : jouets (EN 71 — tests de sécurité mécanique, chimique, inflammabilité), appareils électroniques (EN 62368 — sécurité électrique), produits en contact avec des enfants de moins de 3 ans, cosmétiques, etc.",
          "Pour les produits à faible risque (décoration, papeterie, textile basique, accessoires non électroniques), une analyse de risque documentée sans tests formels peut être suffisante. La décision doit être justifiée par écrit dans le dossier technique.",
        ],
      },
      {
        heading: "Durée de conservation : 10 ans, sans exception",
        body: [
          "L'Article 22 du GPSR est explicite : le dossier technique doit être conservé pendant 10 ans à compter de la date de mise sur le marché du produit. Cette durée s'applique au dernier exemplaire produit ou vendu.",
          "Cela signifie que si vous vendez un produit jusqu'en 2030, le dossier doit être conservable jusqu'en 2040. La conservation peut être numérique (recommandé) ou physique. Il est conseillé de conserver au minimum deux copies dans des locaux distincts ou sur des supports redondants.",
          "En cas de cession d'activité, les obligations de conservation sont transmises au successeur ou, à défaut, incombent à la dernière entreprise responsable de la mise sur le marché.",
        ],
      },
    ],
    conclusion: "Le dossier technique GPSR n'est pas une simple formalité administrative. C'est un document de fond qui prouve que votre produit a été évalué sérieusement avant d'être mis sur le marché. Sa qualité conditionne à la fois votre protection légale en cas d'incident et votre capacité à passer les contrôles douaniers et les audits des places de marché. Un dossier bien structuré, même généré avec l'aide d'outils IA, vaut infiniment mieux qu'une absence de documentation.",
    cta: {
      heading: "Générez votre dossier technique en quelques minutes",
      text: "Conforva structure automatiquement les 15 sections du dossier technique selon les exigences de l'Article 22 GPSR, avec l'analyse de risque ISO 12100 incluse.",
      button: "Créer mon dossier technique",
      href: "/auth/login",
    },
  },
  {
    slug: "personne-responsable-eu-guide",
    title: "Personne responsable EU (Article 16 GPSR) : guide complet pour les vendeurs hors UE",
    description: "L'Article 16 du GPSR impose une personne responsable EU pour tout fabricant hors UE. Qui est concerné, quelles sont ses obligations, comment la désigner et quel coût prévoir.",
    keywords: ["personne responsable EU", "article 16 GPSR", "représentant EU GPSR", "EU responsible person", "désigner personne responsable EU"],
    publishedAt: "2025-03-20",
    readingTime: 6,
    category: "Réglementation",
    intro: "L'Article 16 du règlement GPSR (UE) 2023/988 impose une exigence souvent méconnue mais cruciale : tout fabricant établi hors de l'Union Européenne doit désigner une « personne responsable » établie dans l'UE avant de pouvoir mettre ses produits sur le marché européen. Voici tout ce que vous devez savoir.",
    sections: [
      {
        heading: "Qui est la Personne Responsable EU ?",
        body: [
          "La Personne Responsable (PR EU) est un opérateur économique établi dans l'Union Européenne qui accepte formellement d'assumer les obligations réglementaires du fabricant non-européen vis-à-vis des autorités européennes de surveillance du marché.",
          "Elle sert de point de contact officiel pour les autorités nationales en cas de questions sur la sécurité d'un produit, d'enquête ou de procédure de rappel. Contrairement à ce qu'on pourrait penser, la PR EU n'est pas nécessairement une grande structure — il peut s'agir d'une société spécialisée dans ce service, d'un importateur européen, ou même d'une filiale créée par le fabricant.",
          "Le terme « responsable » peut prêter à confusion : la PR EU n'assume pas la responsabilité pénale du fabricant en cas de défaut de produit. Sa responsabilité se limite aux obligations documentaires : vérifier que la documentation GPSR est en ordre avant de mettre le produit sur le marché, et la mettre à disposition des autorités.",
        ],
      },
      {
        heading: "Qui doit désigner une Personne Responsable EU ?",
        body: [
          "L'obligation s'applique à tout fabricant dont le siège social est établi en dehors de l'Union Européenne. Concrètement, cela inclut :",
          "Les fabricants et marques basés en Chine, en Asie du Sud-Est, aux États-Unis, au Canada, en Australie — bref, tout pays hors UE et hors Espace Économique Européen.",
          "Important : le Royaume-Uni est hors UE depuis le Brexit. Les fabricants britanniques vendant en EU doivent également désigner une PR EU (séparée de leur représentant UKCA pour le marché britannique).",
          "Si vous êtes basé en France, en Allemagne, en Espagne ou dans un autre État membre de l'UE, vous n'avez pas besoin de PR EU — vous assumez directement les obligations en tant que fabricant ou importateur EU.",
        ],
      },
      {
        heading: "Les obligations concrètes de la Personne Responsable EU",
        body: [
          "Selon l'Article 16(3) du GPSR, la PR EU doit s'acquitter des missions suivantes :",
          "**Vérification de la documentation** : s'assurer que le dossier technique et la déclaration UE de conformité ont été établis par le fabricant et qu'ils sont conformes aux exigences du GPSR.",
          "**Conservation des documents** : conserver une copie de la déclaration de conformité et veiller à ce que le dossier technique soit accessible pendant 10 ans.",
          "**Point de contact réglementaire** : être joignable par les autorités nationales et leur communiquer, sur demande, la documentation requise dans un délai raisonnable.",
          "**Actions correctives** : en cas de risque identifié, coopérer avec les autorités et prendre les mesures correctives nécessaires (rappel, retrait du marché, correction de l'étiquetage).",
          "**Mention obligatoire** : les coordonnées de la PR EU (nom/raison sociale, adresse, email, téléphone) doivent figurer sur le produit, son emballage ou la documentation jointe.",
        ],
      },
      {
        heading: "Comment désigner une Personne Responsable EU : les options",
        body: [
          "**Option 1 — Prestataires de service spécialisés (EU Responsible Person services)** : des sociétés proposent ce service moyennant un abonnement annuel. Le tarif varie généralement de 150 à 500 € par an par marque, selon le prestataire et le volume de produits. C'est l'option la plus simple pour les petits vendeurs.",
          "**Option 2 — Votre importateur ou distributeur européen** : si vous avez un partenaire logistique ou commercial en Europe, il peut assumer le rôle de PR EU. Cela nécessite un accord contractuel explicite et que votre partenaire soit informé de ses obligations.",
          "**Option 3 — Créer une entité européenne** : pour les vendeurs ayant un volume significatif (plusieurs millions d'euros de ventes EU annuelles), créer une SAS en France, une GmbH en Allemagne ou une Ltd en Irlande peut être pertinent. Cette entité sera votre PR EU et pourra également assumer d'autres fonctions commerciales.",
          "Quelle que soit l'option, la désignation doit être formalisée par un document contractuel entre le fabricant et la PR EU, précisant les produits concernés, les marchés couverts et les obligations respectives.",
        ],
      },
      {
        heading: "Personne Responsable EU et Amazon : ce qu'Amazon exige exactement",
        body: [
          "Amazon EU a intégré l'exigence de PR EU dans ses politiques de conformité vendeur. Pour les catégories soumises au GPSR, Amazon demande :",
          "Que les coordonnées de la PR EU soient renseignées dans Seller Central (onglet Compte > Informations légales > Personne responsable).",
          "Que ces coordonnées soient également visibles sur le produit ou son emballage (étiquette, insertion dans le carton ou notice).",
          "Que la documentation soit uploadée dans la section Conformité de Seller Central pour les catégories à risque élevé.",
          "Amazon procède régulièrement à des audits et peut demander une mise à jour de la documentation. Une adresse email et un numéro de téléphone valides sont indispensables — les autorités ou Amazon doivent pouvoir joindre la PR EU dans des délais raisonnables.",
        ],
      },
    ],
    conclusion: "La désignation d'une Personne Responsable EU n'est pas une formalité optionnelle — c'est une condition légale préalable à la mise sur le marché EU pour tout fabricant non-européen. Si vous vendez sur Amazon EU sans l'avoir fait, vous opérez en dehors des exigences légales. La bonne nouvelle : le coût de cette conformité est modeste au regard des risques qu'elle permet d'éviter.",
    cta: {
      heading: "Documentez votre Personne Responsable EU",
      text: "Conforva inclut une section dédiée à la Personne Responsable EU dans chaque dossier technique généré. Renseignez les coordonnées une fois, elles s'intègrent dans tous vos documents.",
      button: "Documenter ma PR EU",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-dropshipping-guide",
    title: "GPSR et dropshipping : êtes-vous vraiment concerné ? (Oui, et voici pourquoi)",
    description: "Le dropshipping ne vous exempte pas du GPSR. Découvrez pourquoi les dropshippers sont considérés comme distributeurs ou importateurs, et quelles obligations concrètes s'appliquent à votre activité.",
    keywords: ["GPSR dropshipping", "conformité dropshipping UE", "obligations dropshipping Europe", "dropshipping conformité produit"],
    publishedAt: "2025-04-05",
    readingTime: 6,
    category: "Cas d'usage",
    intro: "Un mythe circule dans les communautés dropshipping : « Je ne stocke pas le produit, je ne suis pas responsable ». C'est faux. Le règlement GPSR (UE) 2023/988 s'applique à vous même si vous faites du dropshipping pur. Voici pourquoi et ce que vous devez mettre en place.",
    sections: [
      {
        heading: "Le dropshipper est un « distributeur » au sens du GPSR",
        body: [
          "Le GPSR définit les rôles dans la chaîne de mise sur le marché de manière fonctionnelle, non logistique. Ce n'est pas le fait de posséder un stock ou d'expédier physiquement le colis qui détermine votre statut — c'est votre rôle commercial.",
          "Le « distributeur » au sens du GPSR est « toute personne physique ou morale de la chaîne d'approvisionnement, autre que le fabricant ou l'importateur, qui met un produit à disposition sur le marché ». Quand vous créez une fiche produit sur votre boutique Shopify ou sur Amazon, et qu'un consommateur européen l'achète, vous mettez ce produit « à disposition sur le marché EU » — vous êtes donc distributeur.",
          "Dans certains cas, notamment quand vous importez depuis la Chine (même si vous ne stockez pas), vous pouvez être qualifié d'importateur si votre fournisseur est établi hors EU et que vous êtes la première entité à faciliter l'entrée du produit sur le marché européen.",
        ],
      },
      {
        heading: "Ce que le GPSR impose aux distributeurs",
        body: [
          "En tant que distributeur, vos obligations au titre du GPSR sont moins étendues que celles du fabricant, mais elles sont réelles et engagent votre responsabilité :",
          "**Vérification de la conformité avant mise en vente** : vous devez vous assurer raisonnablement que le produit que vous vendez est conforme. Cela signifie demander à votre fournisseur la documentation GPSR (dossier technique, déclaration de conformité) avant de lister le produit.",
          "**Ne pas vendre si vous savez que le produit est dangereux** : si vous avez connaissance d'un défaut de sécurité ou si vous avez reçu des plaintes clients concernant la sécurité d'un produit, vous avez l'obligation de cesser la vente et d'informer le fabricant.",
          "**Étiquetage dans la langue du pays de vente** : même si vous ne fabriquez pas le produit, vous devez vous assurer que l'étiquetage de sécurité est présent dans la langue du consommateur.",
          "**Coopération avec les autorités** : si une autorité de surveillance du marché enquête sur un produit que vous vendez, vous devez coopérer et fournir la documentation dont vous disposez.",
        ],
      },
      {
        heading: "Le cas particulier du dropshipping depuis la Chine",
        body: [
          "La grande majorité des dropshippers s'approvisionnent auprès de fournisseurs chinois (AliExpress, CJdropshipping, Spocket avec des sources asiatiques, etc.). Dans ce cas, si vous vendez à des consommateurs européens, vous devez être particulièrement vigilant.",
          "En l'absence d'un importateur EU identifié dans la chaîne, vous pouvez être considéré comme l'importateur de facto — avec les obligations correspondantes plus lourdes. La démarche recommandée : demander systématiquement à votre fournisseur la documentation GPSR disponible, et vérifier que les produits que vous vendez disposent au minimum d'une déclaration de conformité et d'un dossier technique.",
          "Si votre fournisseur ne peut pas fournir ces documents, vous avez trois options : changer de fournisseur, constituer vous-même le dossier technique sur la base des informations produit disponibles, ou arrêter de vendre ce produit sur les marchés EU.",
        ],
      },
      {
        heading: "Les plateformes e-commerce et la conformité GPSR",
        body: [
          "Shopify, Amazon, Cdiscount, OTTO, Zalando — toutes les grandes plateformes de vente en EU ont commencé à intégrer les exigences GPSR dans leurs politiques vendeurs.",
          "Amazon est la plus stricte : elle exige la documentation GPSR et les coordonnées de la Personne Responsable EU directement dans Seller Central. Les annonces non conformes sont suspendues.",
          "Shopify ne vérifie pas directement la conformité, mais votre boutique est soumise aux lois des pays où vous livrez. Si vous vendez à des consommateurs français, la DGCCRF peut vous contrôler.",
          "Etsy, en tant que place de marché, est également soumise aux obligations de marketplace sous le GPSR et procède à des vérifications de conformité.",
        ],
      },
      {
        heading: "La réalité pratique : que faire concrètement si vous faites du dropshipping ?",
        body: [
          "**Étape 1 — Auditer votre catalogue** : identifiez les produits que vous vendez sur les marchés EU et classez-les par niveau de risque (produits pour enfants, électronique, produits chimiques = risque élevé ; décoration, papeterie, accessoires simples = risque moindre).",
          "**Étape 2 — Contacter vos fournisseurs** : demandez-leur les documents GPSR disponibles (déclaration de conformité, rapports de tests, fiche technique). Les bons fournisseurs sur AliExpress ou CJdropshipping ont souvent ces documents pour les produits populaires.",
          "**Étape 3 — Constituer la documentation manquante** : pour les produits où la documentation fournisseur est insuffisante, vous pouvez créer le dossier technique sur la base des informations dont vous disposez (description, matériaux, usage prévu). Des outils comme Conforva permettent de le faire en quelques minutes.",
          "**Étape 4 — Mettre à jour l'étiquetage** : vérifiez que les avertissements de sécurité sont présents dans les langues des pays où vous vendez. Pour les produits envoyés directement depuis le fournisseur, vous pouvez insérer un document de sécurité dans le colis.",
        ],
      },
    ],
    conclusion: "Le GPSR s'applique au dropshipping. Ignorer cette réalité expose votre activité à des suspensions de comptes sur les places de marché, à des amendes des autorités de surveillance, et à une responsabilité personnelle en cas d'accident impliquant un produit que vous avez commercialisé. La mise en conformité n'est pas nécessairement longue ni coûteuse — l'essentiel est d'avoir la documentation appropriée pour chaque produit vendu en EU.",
    cta: {
      heading: "Conformité GPSR pour votre catalogue dropshipping",
      text: "Importez vos produits depuis Shopify et générez les dossiers techniques GPSR en quelques minutes. Sans expertise juridique requise.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-jouets-obligations-vendeurs",
    title: "GPSR et jouets : obligations spécifiques et norme EN 71 expliquées",
    description: "Les jouets sont l'une des catégories les plus réglementées sous le GPSR. Dossier technique, norme EN 71, marquage CE, restriction d'âge : tout ce que doit savoir un vendeur de jouets en UE.",
    keywords: ["GPSR jouets", "norme EN 71 GPSR", "conformité jouets UE", "jouets sécurité Europe", "dossier technique jouets", "marquage CE jouets"],
    publishedAt: "2025-04-20",
    readingTime: 7,
    category: "Réglementation",
    intro: "Les jouets sont l'une des catégories de produits les plus encadrées au monde. En Europe, ils sont soumis à la fois à la directive jouets 2009/48/CE ET au règlement GPSR (UE) 2023/988 pour les aspects de sécurité générale. Si vous vendez des jouets sur Amazon EU, Shopify ou toute autre plateforme, voici exactement ce que vous devez faire.",
    sections: [
      {
        heading: "Deux règlements applicables simultanément",
        body: [
          "La directive jouets 2009/48/CE s'applique spécifiquement aux jouets — c'est-à-dire aux produits conçus ou destinés à être utilisés par des enfants de moins de 14 ans pour jouer. Elle impose le marquage CE, des tests selon les normes EN 71, et une déclaration de conformité CE.",
          "Le GPSR (UE) 2023/988 s'applique en plus comme cadre général de sécurité. Il ajoute les obligations de dossier technique (Article 22), d'analyse de risque documentée selon ISO 12100, et de Personne Responsable EU pour les fabricants hors UE.",
          "En pratique, si vous respectez pleinement la directive jouets 2009/48/CE, vous couvrez une grande partie des exigences GPSR — mais pas toutes. La Personne Responsable EU et la documentation structurée selon l'Article 22 restent des obligations GPSR spécifiques.",
        ],
      },
      {
        heading: "La norme EN 71 : ce qu'elle couvre par partie",
        body: [
          "La norme EN 71 est la norme harmonisée de référence pour les jouets en Europe. Elle est composée de plusieurs parties, dont les plus fréquemment applicables sont :",
          "**EN 71-1 — Propriétés mécaniques et physiques** : résistance aux chocs, taille des petites pièces (risque d'ingestion pour les enfants de moins de 3 ans), résistance à la traction des cordons et liens, bords et pointes dangereux.",
          "**EN 71-2 — Inflammabilité** : comportement au feu des matériaux constitutifs du jouet — textiles, mousses, plastiques, papier. Chaque catégorie de matériau a ses propres limites.",
          "**EN 71-3 — Migration des éléments chimiques** : limites de migration des métaux lourds (plomb, cadmium, arsenic, mercure, baryum, antimoine, chrome, sélénium) depuis les matériaux du jouet.",
          "**EN 71-7 — Peintures au doigt** : composition et innocuité pour les jouets créatifs utilisant des peintures.",
          "**EN 71-8 — Jeux d'activité pour usage domestique** : charges, résistance mécanique et sécurité pour les équipements de jeu d'intérieur (toboggans, balançoires).",
          "Selon le type de jouet, différentes parties de la norme EN 71 s'appliquent. Des tests en laboratoire accrédité ISO 17025 sont généralement requis pour EN 71-1, EN 71-2 et EN 71-3.",
        ],
      },
      {
        heading: "Le marquage CE : obligatoire et réglementé",
        body: [
          "Tout jouet vendu dans l'UE doit porter le marquage CE. Ce marquage n'est pas une certification délivrée par un organisme tiers — c'est une déclaration du fabricant que le produit respecte les directives européennes applicables.",
          "Sur un jouet, le marquage CE doit avoir une hauteur minimale de 5 mm et être apposé de manière visible, lisible et indélébile sur le jouet lui-même, sur son emballage, ou dans la notice d'instructions.",
          "La falsification du marquage CE — apposer CE sur un produit non conforme — est une infraction pénale dans tous les États membres de l'UE. Ne pas confondre avec le marquage CE authentique le symbole \"China Export\" utilisé par certains fabricants chinois, qui ressemble visuellement au CE européen mais n'a aucune valeur réglementaire.",
        ],
      },
      {
        heading: "Avertissements d'âge et restrictions obligatoires",
        body: [
          "Certains avertissements sont obligatoires sur les emballages de jouets et doivent apparaître dans la langue du pays de vente :",
          "**Pictogramme interdit aux moins de 3 ans** : obligatoire pour tout jouet contenant de petites pièces susceptibles d'être avalées ou inhalées par un enfant de moins de 3 ans. Ce pictogramme (petit enfant dans un cercle barré) est normalisé au niveau européen.",
          "**Mention « Ne convient pas aux enfants de moins de X ans »** : pour les jouets avec des pièces petites mais destinés aux enfants de plus de 3 ans.",
          "Ces mentions doivent figurer sur l'emballage du jouet, en texte lisible, et être répétées dans la notice d'instructions. Les oublier expose à des sanctions et à des suspensions d'annonces sur Amazon.",
        ],
      },
      {
        heading: "Amazon et les jouets : les exigences spécifiques",
        body: [
          "Amazon est particulièrement strict sur la catégorie Jouets & Jeux. Les ASINs peuvent être vérifiés proactivement ou suite à une plainte client.",
          "Amazon peut demander : les rapports de tests EN 71 (EN 71-1, EN 71-2, EN 71-3 selon le produit), la déclaration de conformité CE, les coordonnées de la Personne Responsable EU, des photos du marquage CE et des avertissements d'âge sur l'emballage.",
          "Sans cette documentation uploadée dans Seller Central, les nouvelles annonces dans la catégorie jouets peuvent être bloquées dès la création. Préparez toute la documentation avant de lister.",
          "✓ Rapports de tests EN 71 par laboratoire accrédité ISO 17025",
          "✓ Déclaration de conformité CE signée",
          "✓ Dossier technique Art. 22 GPSR",
          "✓ Personne Responsable EU documentée dans Seller Central",
          "✓ Marquage CE visible sur emballage (hauteur ≥ 5 mm)",
          "✓ Avertissements d'âge en français et dans les langues des pays de vente",
        ],
      },
    ],
    conclusion: "Les jouets sont soumis à une réglementation stricte en Europe. La combinaison directive jouets + GPSR crée un cadre exigeant mais cohérent : tests EN 71 appropriés, marquage CE correct, dossier technique structuré et Personne Responsable EU documentée vous permettent de vendre en toute sécurité sur tous les marchés européens et sur Amazon EU.",
    cta: {
      heading: "Générez votre dossier technique jouets",
      text: "Conforva génère les 15 sections du dossier technique GPSR pour vos jouets, avec l'analyse de risque ISO 12100 et les étiquettes multilingues.",
      button: "Créer mon dossier jouets",
      href: "/auth/login",
    },
  },
  {
    slug: "declaration-conformite-ue-gpsr-guide",
    title: "Déclaration UE de conformité GPSR (Article 24) : comment la rédiger",
    description: "La déclaration UE de conformité est obligatoire pour chaque produit GPSR. Découvrez ce qu'elle doit contenir selon l'Article 24, qui peut la signer et comment la structurer correctement.",
    keywords: ["déclaration conformité GPSR", "article 24 GPSR", "DoC GPSR", "rédiger déclaration conformité UE", "déclaration conformité produit"],
    publishedAt: "2025-04-28",
    readingTime: 6,
    category: "Documentation",
    intro: "La déclaration UE de conformité (souvent appelée DoC — Declaration of Conformity) est l'un des documents obligatoires du GPSR. Définie par l'Article 24 du règlement (UE) 2023/988, elle atteste formellement que le produit satisfait à toutes les exigences réglementaires applicables. Voici ce qu'elle doit contenir et comment la structurer.",
    sections: [
      {
        heading: "Qu'est-ce que la déclaration UE de conformité ?",
        body: [
          "La déclaration UE de conformité est un document officiel par lequel le fabricant — ou son représentant légal EU — prend la responsabilité formelle de déclarer que le produit satisfait à toutes les exigences réglementaires applicables.",
          "Important : ce n'est pas une certification délivrée par un organisme tiers. C'est une auto-déclaration du fabricant. Sa valeur juridique dépend donc entièrement de la qualité du dossier technique et des évaluations qui la sous-tendent.",
          "La DoC doit accompagner le produit ou être accessible sur demande des autorités. Pour les ventes en ligne, il est recommandé de la mettre à disposition en téléchargement sur le site web ou de l'inclure dans la documentation PDF jointe à la commande.",
        ],
      },
      {
        heading: "Les informations obligatoires dans la déclaration de conformité",
        body: [
          "**Identification du produit** : nom commercial, référence, numéro de modèle, description succincte. Le produit doit être identifiable sans ambiguïté.",
          "**Identification du fabricant** : raison sociale, adresse complète, pays. Si le fabricant est établi hors UE, ajouter les coordonnées de la Personne Responsable EU.",
          "**Déclaration réglementaire** : liste exacte des règlements EU auxquels le produit est déclaré conforme. Pour un produit GPSR standard : « Règlement (UE) 2023/988 relatif à la sécurité générale des produits ». Si d'autres directives s'appliquent (directive jouets 2009/48/CE, RoHS 2011/65/UE, RED 2014/53/UE...), les lister également.",
          "**Normes harmonisées appliquées** : liste des normes retenues pour démontrer la conformité. Exemple : « EN 15494:2019 — Bougies — Exigences de sécurité et d'information ».",
          "**Date et lieu de délivrance** : date de signature de la déclaration.",
          "**Signature** : nom, fonction et signature manuscrite (ou électronique qualifiée) du représentant légal habilité.",
        ],
      },
      {
        heading: "Qui peut signer la déclaration de conformité ?",
        body: [
          "La déclaration doit être signée par le fabricant ou son représentant légal EU autorisé à engager la responsabilité de la société. En pratique, il s'agit du dirigeant de l'entreprise, du directeur qualité, ou de toute personne disposant d'une délégation de pouvoir écrite.",
          "Attention à la confusion fréquente : la Personne Responsable EU (Article 16 GPSR) n'est pas nécessairement le signataire de la déclaration de conformité. La PR EU vérifie et conserve la documentation — mais la déclaration reste sous la responsabilité du fabricant.",
          "Pour les auto-entrepreneurs ou TPE, le dirigeant signe lui-même. Pour les sociétés plus importantes, une délégation de signature au responsable qualité est recommandée pour centraliser la gestion documentaire.",
        ],
      },
      {
        heading: "Mise à jour et versioning de la déclaration",
        body: [
          "La déclaration de conformité doit être mise à jour dès que le produit change de manière significative : modification des matériaux, de la conception, de l'emballage, ou lorsque les normes harmonisées référencées sont révisées.",
          "Il est fortement recommandé de versionner les déclarations (v1.0, v1.1, v2.0...) et de conserver toutes les versions archivées dans le dossier technique. En cas de contrôle, les autorités peuvent demander l'historique complet.",
          "La durée de conservation est de 10 ans à compter de la date de mise sur le marché du dernier exemplaire du produit — alignée sur la durée de conservation du dossier technique.",
        ],
      },
      {
        heading: "DoC et marquage CE : quelle différence ?",
        body: [
          "Pour les produits soumis à des directives sectorielles (jouets, électronique, machines...), la déclaration de conformité donne le droit d'apposer le marquage CE sur le produit. Pour les produits couverts uniquement par le GPSR sans directive sectorielle, il n'y a pas de marquage CE obligatoire — mais la déclaration de conformité reste requise.",
          "Le marquage CE est donc la conséquence visible de la conformité, la déclaration de conformité en est la preuve documentaire. Les deux sont complémentaires mais distincts.",
        ],
      },
    ],
    conclusion: "La déclaration UE de conformité n'est pas une simple formalité. C'est le document qui engage formellement votre responsabilité sur la sécurité de votre produit. En cas d'accident ou de contrôle, elle prouve que vous avez agi de bonne foi et avec diligence. Un dossier technique solide est le seul fondement crédible d'une déclaration de conformité.",
    cta: {
      heading: "Générez votre déclaration de conformité",
      text: "Conforva génère automatiquement la déclaration UE de conformité pré-remplie à partir de vos données produit. Prête à signer en quelques minutes.",
      button: "Créer ma déclaration",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-shopify-boutique-conformite",
    title: "Shopify et GPSR : comment mettre votre boutique en conformité (guide 2025)",
    description: "Votre boutique Shopify vend en Europe ? Le GPSR s'applique. Découvrez les étapes concrètes pour mettre votre catalogue Shopify en conformité GPSR et éviter les contrôles DGCCRF.",
    keywords: ["GPSR Shopify", "Shopify conformité GPSR", "boutique Shopify conformité UE", "Shopify GPSR 2025", "mise en conformité Shopify"],
    publishedAt: "2025-05-10",
    readingTime: 6,
    category: "Cas d'usage",
    intro: "Votre boutique Shopify génère des ventes vers la France, l'Allemagne, les Pays-Bas ou d'autres pays de l'UE ? Que vous soyez basé en Europe ou à l'étranger, le GPSR (UE) 2023/988 s'applique à votre activité. Contrairement à Amazon, Shopify ne vous enverra pas de notification de suspension — mais les autorités nationales peuvent contrôler votre boutique. Voici comment vous mettre en conformité.",
    sections: [
      {
        heading: "Shopify et le GPSR : qui est responsable ?",
        body: [
          "Contrairement à Amazon, Shopify n'est pas une place de marché au sens du GPSR — c'est un prestataire technique. Shopify n'a donc pas d'obligation légale de vérifier la conformité de vos produits.",
          "C'est vous, le marchand Shopify, qui êtes responsable à 100% de la conformité GPSR de ce que vous vendez. Si vous êtes basé dans l'UE, vous êtes soit fabricant (si vous marquez les produits à votre nom), soit importateur (si vous importez depuis hors UE), soit distributeur.",
          "La DGCCRF en France, le Ministère de l'Économie en Allemagne, le NVWA aux Pays-Bas — chaque autorité nationale de surveillance peut contrôler les boutiques en ligne vendant à leurs consommateurs, y compris les boutiques Shopify étrangères. Les contrôles en ligne se sont intensifiés depuis 2024.",
        ],
      },
      {
        heading: "Les 5 étapes pour mettre son catalogue Shopify en conformité",
        body: [
          "**Étape 1 — Identifier vos marchés EU** : dans Shopify Analytics, identifiez les pays de livraison. Tous les pays de l'UE (France, Allemagne, Italie, Espagne, Pays-Bas, Belgique, etc.) sont soumis au GPSR.",
          "**Étape 2 — Classer vos produits par risque** : produits pour enfants, électronique, cosmétiques, bougies, textiles avec produits chimiques = priorité haute. Décoration simple, papeterie, accessoires non électroniques = priorité moindre.",
          "**Étape 3 — Constituer les dossiers techniques** : pour chaque référence vendue en EU, créez le dossier technique Art. 22 avec l'analyse de risque ISO 12100, la déclaration de conformité et les étiquettes multilingues.",
          "**Étape 4 — Désigner une Personne Responsable EU** : si vous êtes basé hors UE, désignez votre PR EU et documentez ses coordonnées complètes.",
          "**Étape 5 — Mettre à jour les fiches produits** : ajoutez les informations de sécurité, les avertissements dans la langue du pays de livraison, et la mention de la Personne Responsable EU dans vos fiches produits Shopify ou votre documentation.",
        ],
      },
      {
        heading: "L'import Shopify dans Conforva : générer les dossiers en masse",
        body: [
          "Conforva permet d'importer directement vos fiches produits Shopify pour pré-remplir les dossiers GPSR. Il suffit de coller l'URL de votre fiche produit Shopify — Conforva récupère automatiquement le nom, la description et les matériaux pour pré-remplir votre dossier.",
          "Cette intégration est disponible sur les plans Growth et Pro. Pour un catalogue de plusieurs dizaines de références, elle réduit considérablement le temps de mise en conformité par rapport à une saisie manuelle.",
          "Le flux de travail recommandé pour Shopify : exporter la liste de vos produits depuis Shopify, importer chaque référence dans Conforva, valider l'analyse de risque et les sections du dossier, puis exporter les PDFs pour archivage.",
        ],
      },
      {
        heading: "Ce qu'il faut afficher sur votre boutique Shopify",
        body: [
          "Outre la documentation interne (dossier technique), certaines informations doivent être visibles sur votre boutique ou vos emballages :",
          "✓ Coordonnées du fabricant ou de la Personne Responsable EU sur chaque produit ou son emballage",
          "✓ Avertissements de sécurité dans la langue du pays de livraison (boutique livrant en France → avertissements en français)",
          "✓ Numéro de modèle ou référence permettant d'identifier le produit",
          "✓ Restrictions d'âge le cas échéant (pictogramme ou mention textuelle)",
          "✓ Instructions d'utilisation dans la langue du consommateur pour les produits complexes",
        ],
      },
    ],
    conclusion: "Contrairement à Amazon, Shopify ne vous suspend pas pour non-conformité GPSR. Mais les autorités nationales comme la DGCCRF ont la compétence pour contrôler votre boutique et peuvent imposer des mesures correctives coûteuses. La mise en conformité proactive protège à la fois votre activité et vos clients. Avec les bons outils, un catalogue Shopify peut être mis en conformité GPSR en quelques heures.",
    cta: {
      heading: "Importez votre catalogue Shopify dans Conforva",
      text: "Collez l'URL d'une fiche produit Shopify — Conforva pré-remplit automatiquement votre dossier GPSR. Disponible sur les plans Growth et Pro.",
      button: "Démarrer avec Shopify",
      href: "/auth/login",
    },
  },
  {
    slug: "analyse-risque-gpsr-iso-12100",
    title: "Analyse de risque GPSR : méthode ISO 12100 expliquée étape par étape",
    description: "L'analyse de risque ISO 12100 est au cœur du dossier technique GPSR. Comprenez la méthode, les 6 étapes à suivre et ce qu'elle doit contenir pour satisfaire les autorités de surveillance.",
    keywords: ["analyse risque GPSR", "ISO 12100 GPSR", "analyse risque ISO 12100", "évaluation risque produit GPSR", "dossier technique analyse risque", "méthode analyse risque GPSR"],
    publishedAt: "2025-05-20",
    readingTime: 8,
    category: "Documentation",
    intro: "L'analyse de risque est le document le plus important du dossier technique GPSR. C'est elle qui prouve que vous avez systématiquement identifié les dangers de votre produit et mis en place des mesures pour les réduire. La méthode reconnue par les autorités européennes est la norme ISO 12100:2010 — voici comment l'appliquer concrètement, même sans être ingénieur.",
    sections: [
      {
        heading: "Pourquoi l'ISO 12100 est la méthode de référence pour le GPSR",
        body: [
          "L'ISO 12100:2010 « Sécurité des machines — Principes généraux de conception — Appréciation du risque et réduction du risque » est la norme internationale de référence pour l'évaluation des risques. Bien qu'initialement conçue pour les machines industrielles, sa méthodologie est désormais appliquée à tous types de produits de consommation dans le cadre du GPSR.",
          "Le GPSR n'impose pas explicitement l'ISO 12100 — il exige une « évaluation des risques ». Cependant, l'ISO 12100 est la méthodologie reconnue par les autorités européennes et les organismes notifiés. L'utiliser démontre que vous avez adopté une approche systématique et professionnelle.",
          "Une analyse de risque ISO 12100 bien documentée est votre meilleure protection légale : en cas de contrôle, d'accident ou de procédure de rappel, elle prouve que vous avez agi avec toute la diligence raisonnable.",
        ],
      },
      {
        heading: "Les 6 étapes de l'analyse de risque ISO 12100",
        body: [
          "**Étape 1 — Définition des limites du produit** : définissez l'usage prévu (à quoi sert le produit ?), la population cible (enfants, adultes, professionnels ?), le cycle de vie complet (production, transport, utilisation, maintenance, élimination) et l'environnement d'utilisation (intérieur, extérieur, eau, chaleur...).",
          "**Étape 2 — Identification des dangers** : listez systématiquement tous les dangers potentiels selon les catégories ISO 12100 : mécaniques (coupure, écrasement, projection), thermiques (brûlure, incendie), électriques (électrocution, court-circuit), chimiques (toxicité, allergènes, SVHC REACH), biologiques, ergonomiques (effort excessif), liés à l'environnement (bruit, vibrations, rayonnements).",
          "**Étape 3 — Estimation du risque** : pour chaque danger identifié, évaluez la probabilité d'occurrence (échelle 1 à 5) et la gravité des conséquences (1 à 5). Le niveau de risque (NR) = probabilité × gravité. NR ≥ 12 = risque critique. NR 6–11 = risque élevé. NR 1–5 = risque acceptable.",
          "**Étape 4 — Évaluation du risque** : comparez le niveau de risque calculé au niveau tolérable pour la population cible. Pour les produits destinés aux enfants ou aux personnes vulnérables, les seuils sont beaucoup plus stricts que pour les adultes.",
          "**Étape 5 — Réduction du risque** : pour chaque risque non tolérable, définissez les mesures de mitigation selon la hiérarchie ISO 12100 : élimination par la conception (solution prioritaire), protection par des dispositifs de sécurité, information de l'utilisateur (avertissements, étiquettes, instructions).",
          "**Étape 6 — Documentation** : compilez toute l'analyse dans un tableau structuré dans le dossier technique. Documentez chaque danger, l'estimation initiale, la mesure de mitigation et la réévaluation du risque résiduel après mitigation.",
        ],
      },
      {
        heading: "Exemple concret : analyse de risque d'une bougie parfumée",
        body: [
          "Pour illustrer la méthode, voici comment s'applique l'ISO 12100 à une bougie parfumée en cire de soja :",
          "**H1 — Incendie / flamme nue** : gravité = 4 (potentiellement grave), probabilité = 3 (possible), NR = 12. Risque critique → Mesure : avertissement obligatoire « Ne jamais laisser sans surveillance », instructions d'usage claires.",
          "**H2 — Brûlure par contact avec cire chaude** : gravité = 3, probabilité = 2, NR = 6. Mesure : avertissement « Laisser refroidir avant manipulation ».",
          "**H3 — Ingestion accidentelle (enfant < 3 ans)** : gravité = 4, probabilité = 1, NR = 4. Mesure : mention « Tenir hors de portée des enfants ».",
          "**H4 — Émissions de COV en espace confiné** : gravité = 2, probabilité = 3, NR = 6. Mesure : instruction de ventiler la pièce, test qualité des fragrances.",
          "Ce tableau est intégré dans la Section 5 du dossier technique. Il démontre une évaluation sérieuse et documentée.",
        ],
      },
      {
        heading: "L'analyse de risque pour les produits sans danger apparent",
        body: [
          "Même pour les produits qui semblent inoffensifs (décoration, papeterie, vêtements non chimiques), une analyse de risque documentée est nécessaire. L'absence de toute analyse est en soi une non-conformité GPSR.",
          "Pour ces produits, l'analyse peut être plus courte et conclure que les risques identifiés sont tous au niveau acceptable (NR ≤ 5) sans mesures supplémentaires. Mais elle doit exister et être archivée dans le dossier technique.",
          "L'objectif n'est pas de trouver à tout prix des dangers graves — c'est de prouver que vous avez systématiquement réfléchi à la sécurité de votre produit. Une analyse courte et honnête vaut infiniment mieux qu'une absence de documentation.",
        ],
      },
    ],
    conclusion: "L'analyse de risque ISO 12100 n'est pas réservée aux ingénieurs. Avec la bonne méthodologie et les bons outils, n'importe quel vendeur peut structurer une analyse solide pour ses produits. L'important est d'être systématique, documenté et honnête : identifier tous les dangers, estimer les risques de manière réaliste, et documenter les mesures mises en place.",
    cta: {
      heading: "Générez votre analyse de risque ISO 12100",
      text: "Conforva structure automatiquement l'analyse de risque ISO 12100 pour votre produit, incluse dans le dossier technique complet.",
      button: "Créer mon analyse de risque",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-vs-ancienne-directive-ce-qui-change",
    title: "GPSR vs directive 2001/95/CE : les 7 changements clés pour les vendeurs",
    description: "Le GPSR remplace la directive sécurité générale des produits de 2001. Ce qui change concrètement pour les e-commerçants : dossier technique obligatoire, places de marché, Personne Responsable EU et plus.",
    keywords: ["GPSR changements 2025", "GPSR vs directive 2001/95", "nouveautés GPSR", "GPSR remplacement directive", "GPSR différences e-commerce"],
    publishedAt: "2025-05-30",
    readingTime: 7,
    category: "Réglementation",
    intro: "Le 13 décembre 2024, le règlement GPSR (UE) 2023/988 a officiellement remplacé la directive sur la sécurité générale des produits de 2001 (DSGP, 2001/95/CE). Après 23 ans d'application de l'ancienne directive, les changements sont importants — et certains surprennent même des vendeurs expérimentés. Voici les 7 points qui impactent directement les e-commerçants.",
    sections: [
      {
        heading: "1. Des obligations documentaires précises et contraignantes",
        body: [
          "L'ancienne directive 2001/95/CE imposait aux fabricants de mettre sur le marché des produits sûrs — mais laissait une grande liberté sur la forme des preuves. Il n'y avait pas d'obligation explicite de constituer un « dossier technique » structuré.",
          "Le GPSR est radicalement plus prescriptif : l'Article 22 définit exactement ce que le dossier technique doit contenir (15 sections), l'Article 24 définit le contenu de la déclaration de conformité, et l'Article 9 précise les informations obligatoires sur les produits.",
          "En pratique, les approches informelles (un simple certificat de test sans analyse de risque documentée, une déclaration de conformité sans dossier technique) ne sont plus suffisantes.",
        ],
      },
      {
        heading: "2. La Personne Responsable EU : une obligation entièrement nouvelle",
        body: [
          "L'ancienne directive n'imposait pas explicitement la désignation d'un représentant EU pour les fabricants non-européens. Le GPSR crée cette obligation dans son Article 16.",
          "Pour les vendeurs Amazon FBA sourcant depuis la Chine ou les États-Unis, c'est probablement le changement le plus impactant. Sans Personne Responsable EU désignée et documentée, votre produit ne peut légalement pas être mis sur le marché EU.",
          "L'obligation est immédiate depuis le 13 décembre 2024 — il n'y a pas de période de grâce.",
        ],
      },
      {
        heading: "3. Les places de marché en ligne deviennent des acteurs de conformité",
        body: [
          "Sous l'ancienne directive, Amazon, Etsy ou Cdiscount n'avaient pas d'obligations directes concernant la conformité des vendeurs tiers. Le GPSR change fondamentalement la donne.",
          "Le GPSR impose aux opérateurs de marché en ligne de s'assurer de la conformité des produits listés, de signaler les produits dangereux, et de coopérer avec les autorités nationales.",
          "Concrètement : Amazon EU est maintenant légalement obligé de vérifier et suspendre les annonces non conformes — ce qui explique la vague de suspensions observée depuis début 2025.",
        ],
      },
      {
        heading: "4. Le e-commerce explicitement couvert",
        body: [
          "L'ancienne directive avait été rédigée en 2001, à une époque où le e-commerce était marginal. Elle ne mentionnait pas explicitement les ventes en ligne, créant des zones grises d'interprétation.",
          "Le GPSR comble ce vide : il s'applique explicitement aux ventes en ligne, aux marketplaces, aux ventes transfrontalières, et aux produits vendus directement aux consommateurs sans intermédiaire physique.",
          "Vendre depuis votre boutique Shopify aux Pays-Bas vers un consommateur allemand vous soumet au GPSR — sans aucune ambiguïté possible.",
        ],
      },
      {
        heading: "5. Des exigences d'étiquetage plus précises",
        body: [
          "Sous l'ancienne directive, l'étiquetage était surtout régi par les directives sectorielles. Pour les produits non couverts par une directive sectorielle, les exigences étaient vagues.",
          "Le GPSR impose des exigences d'étiquetage précises pour tous les produits : identification du fabricant ou de la Personne Responsable EU sur le produit ou l'emballage, numéro de modèle ou référence, et avertissements de sécurité dans la langue du pays de vente.",
          "Cette dernière exigence a des implications pratiques importantes : un produit vendu en France, en Allemagne et en Italie doit disposer d'avertissements dans ces trois langues.",
        ],
      },
      {
        heading: "6. La notification des accidents renforcée",
        body: [
          "L'ancienne directive imposait une notification aux autorités en cas de produit dangereux, mais les procédures variaient selon les États membres.",
          "Le GPSR harmonise ces procédures à l'échelle EU et raccourcit les délais de notification. Le système Safety Gate (ex-RAPEX) est modernisé et directement interconnecté entre les autorités nationales.",
          "Pour les vendeurs : en cas d'accident ou de plainte sérieuse concernant la sécurité d'un produit, vous avez des obligations de notification plus strictes et des délais plus courts. Ne pas notifier constitue une infraction supplémentaire.",
        ],
      },
      {
        heading: "7. Des sanctions harmonisées et renforcées",
        body: [
          "L'ancienne directive laissait aux États membres la liberté de fixer leurs propres sanctions. Les montants variaient très fortement d'un pays à l'autre.",
          "Le GPSR impose aux États membres de prévoir des mesures « effectives, proportionnées et dissuasives » — un cadre qui encourage des sanctions plus sévères et plus cohérentes à travers l'UE.",
          "En France, la loi prévoit des amendes administratives pouvant atteindre plusieurs dizaines de milliers d'euros pour les infractions aux règles de sécurité des produits, indépendamment des éventuelles poursuites pénales en cas d'accident.",
        ],
      },
    ],
    conclusion: "Le GPSR marque une rupture nette avec l'ère de la directive 2001/95/CE. Les obligations documentaires sont plus précises, les responsabilités plus clairement définies, et les acteurs comme Amazon sont désormais directement impliqués dans la conformité. Pour les e-commerçants qui n'ont pas encore mis à jour leurs pratiques, la mise en conformité ne peut plus attendre.",
    cta: {
      heading: "Mettez-vous en conformité avec le GPSR 2025",
      text: "Conforva génère les dossiers techniques, déclarations de conformité et étiquettes multilingues conformes aux nouvelles exigences du GPSR.",
      button: "Démarrer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "sanctions-gpsr-france-europe",
    title: "Sanctions GPSR en France et en Europe : amendes, rappels et responsabilités",
    description: "Non-conformité au GPSR : quelles sanctions risquez-vous ? Suspensions Amazon, amendes DGCCRF, blocages douaniers, responsabilité civile et pénale — guide complet des risques réels.",
    keywords: ["sanctions GPSR", "amende GPSR France", "non-conformité GPSR", "rappel produit GPSR", "risques GPSR e-commerce", "DGCCRF GPSR"],
    publishedAt: "2025-06-01",
    readingTime: 7,
    category: "Réglementation",
    intro: "Que risque concrètement un e-commerçant qui ne respecte pas le GPSR ? Au-delà du discours réglementaire abstrait, les conséquences sont à la fois commerciales, administratives et potentiellement pénales. Ce guide dresse un tableau réaliste des sanctions — des plus immédiates aux plus sévères.",
    sections: [
      {
        heading: "Les suspensions de compte Amazon : la sanction la plus immédiate",
        body: [
          "Amazon EU est l'acteur dont les sanctions sont les plus immédiates et les plus impactantes pour les e-commerçants. Amazon peut suspendre un ASIN spécifique pour non-conformité GPSR, avec arrêt immédiat des ventes.",
          "Dans les cas plus graves, Amazon peut placer un compte vendeur entier en révision si de nombreux ASINs présentent des non-conformités.",
          "Les délais de réactivation après suspension GPSR varient de quelques jours à plusieurs semaines, pendant lesquels les ventes sont à l'arrêt. Pour un vendeur réalisant 80% de son chiffre sur Amazon EU, cela peut représenter des milliers d'euros de manque à gagner par semaine.",
          "La prévention est de loin la stratégie la plus efficace. Constituer son dossier GPSR avant d'être contacté par Amazon est la seule approche raisonnable.",
        ],
      },
      {
        heading: "Les mesures administratives : DGCCRF et autorités nationales",
        body: [
          "La DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes) est l'autorité française de surveillance du marché. Elle a des pouvoirs renforcés sous le GPSR.",
          "Les mesures qu'elle peut imposer : obligation de retrait du marché ou de rappel du produit aux frais du fabricant, interdiction de mise en vente, confiscation des stocks non conformes, obligation de modifier l'étiquetage.",
          "Les amendes administratives pour infractions aux règles de sécurité des produits peuvent atteindre plusieurs dizaines de milliers d'euros en France. Dans les autres États membres, les montants varient mais le GPSR encourage des sanctions « effectives et dissuasives ».",
          "Les contrôles DGCCRF sur les boutiques en ligne se sont intensifiés depuis 2024, notamment pour les produits vendus sur les marchés de Noël, les jouets, et les produits électroniques.",
        ],
      },
      {
        heading: "Le blocage douanier : immobilisation coûteuse des marchandises",
        body: [
          "Les douanes des États membres EU peuvent bloquer l'entrée de produits non conformes sur le territoire. Elles peuvent demander la présentation du dossier technique, de la déclaration de conformité, et des preuves de désignation de la Personne Responsable EU.",
          "Un blocage douanier peut immobiliser votre stock pendant plusieurs semaines dans un entrepôt douanier, avec des frais de gardiennage qui s'accumulent, sans possibilité de récupérer les marchandises ou de les vendre.",
          "Pour les vendeurs Amazon FBA qui expédient des containers depuis la Chine vers des centres de distribution EU, un blocage douanier peut être catastrophique — stock immobilisé, ruptures de stock sur Amazon, et frais logistiques supplémentaires.",
        ],
      },
      {
        heading: "La responsabilité civile : quand un consommateur est blessé",
        body: [
          "Si un consommateur est blessé par un produit que vous avez vendu, votre responsabilité civile est engagée. Le GPSR aggrave considérablement cette responsabilité en cas d'absence de documentation.",
          "Sans dossier technique : impossible de prouver que vous avez évalué les risques du produit avant mise sur le marché. Les tribunaux civils considèrent l'absence de documentation GPSR comme une preuve de négligence.",
          "Avec un dossier technique conforme : vous pouvez démontrer votre bonne foi et prouver que l'accident résulte d'un usage imprévisible, pas d'un défaut d'évaluation de votre part.",
          "Les indemnités en responsabilité produit peuvent être très importantes, surtout pour des blessures graves : brûlures, intoxications, blessures d'enfants. L'assurance responsabilité civile professionnelle ne couvre pas toujours les situations de non-conformité délibérée.",
        ],
      },
      {
        heading: "La responsabilité pénale : l'extrémité du spectre",
        body: [
          "En France, la mise sur le marché d'un produit dangereux est une infraction pénale au titre du Code de la consommation (articles L. 421-1 et suivants). Les peines peuvent inclure des amendes pénales significatives et, dans les cas les plus graves, des peines d'emprisonnement.",
          "La responsabilité pénale peut être engagée non seulement pour la mise en vente d'un produit dangereux, mais aussi pour l'absence délibérée de documentation GPSR — considérée comme une négligence caractérisée.",
          "Les enquêtes pénales pour produits dangereux sont généralement déclenchées par des accidents graves signalés à la DGCCRF ou aux services de santé. Elles peuvent viser le fabricant, l'importateur, le distributeur, voire le dirigeant personnellement.",
        ],
      },
    ],
    conclusion: "Les risques liés à la non-conformité GPSR sont bien réels et variés : suspensions Amazon immédiates, amendes administratives, blocages douaniers, responsabilité civile et pénale. La prévention est de loin la stratégie la plus efficace et la moins coûteuse. Constituer les dossiers techniques GPSR pour ses produits représente un investissement modeste comparé aux conséquences potentielles.",
    cta: {
      heading: "Protégez votre activité avec des dossiers GPSR conformes",
      text: "Générez les dossiers techniques, déclarations de conformité et étiquettes multilingues pour tous vos produits. Dès 0€ pour votre première référence.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-bougies-obligations-etiquetage",
    title: "GPSR et bougies : obligations, étiquetage CLP et normes EN 15494 expliquées",
    description: "Vous fabriquez ou vendez des bougies en Europe ? GPSR, CLP, EN 15494, EN 15493 : découvrez toutes les obligations légales pour vendre vos bougies en conformité en France et dans l'UE.",
    keywords: ["GPSR bougies", "étiquetage bougie GPSR", "norme EN 15494 bougie", "CLP bougies", "conformité bougies UE", "dossier technique bougie", "vendre bougies France"],
    publishedAt: "2025-06-03",
    readingTime: 8,
    category: "Réglementation",
    intro: "Les bougies sont l'un des produits les plus vendus en e-commerce artisanal et créatif — et l'une des catégories où la non-conformité est la plus répandue. GPSR, règlement CLP, norme EN 15494 : voici tout ce que vous devez savoir pour vendre vos bougies légalement en France et dans toute l'Union Européenne.",
    sections: [
      {
        heading: "Quelles réglementations s'appliquent aux bougies ?",
        body: [
          "Les bougies sont soumises à plusieurs réglementations simultanément. Il ne suffit pas de respecter une seule loi — toutes s'appliquent en même temps :",
          "**Le GPSR (UE) 2023/988** : le règlement général sur la sécurité des produits, applicable depuis le 13 décembre 2024. Il impose un dossier technique complet (Article 22), une analyse de risque ISO 12100, une déclaration de conformité (Article 24) et la désignation d'une Personne Responsable EU si vous êtes fabricant hors UE.",
          "**Le règlement CLP (UE) 1272/2008** : classification, étiquetage et emballage des mélanges chimiques dangereux. Les fragrances synthétiques utilisées dans les bougies sont souvent des mélanges soumis au CLP. Si votre mélange de fragrance dépasse certains seuils de concentration, des pictogrammes de danger (GHS) et des phrases de risque (H/P) doivent figurer sur l'étiquette.",
          "**La norme EN 15494:2019** : norme européenne spécifique aux bougies, qui définit les exigences d'étiquetage de sécurité. Elle précise quels avertissements doivent obligatoirement figurer sur l'étiquette d'une bougie.",
          "**La norme EN 15493:2007** : spécifications de sécurité incendie pour les bougies. Elle définit des limites sur les caractéristiques de combustion pour réduire le risque d'incendie.",
        ],
      },
      {
        heading: "L'étiquetage obligatoire selon la norme EN 15494",
        body: [
          "La norme EN 15494:2019 impose les mentions de sécurité suivantes sur l'étiquette ou l'emballage de chaque bougie vendue dans l'UE :",
          "✓ **Pictogramme flamme** ou mention « Danger — Flamme nue » (selon la norme)",
          "✓ **« Ne jamais laisser une bougie allumée sans surveillance »**",
          "✓ **« Tenir hors de portée des enfants et des animaux »**",
          "✓ **« Poser sur une surface plane, résistante à la chaleur, protégée de tout courant d'air »**",
          "✓ **« Arrêter l'utilisation lorsqu'il reste 1 cm de cire »** (pour les bougies en verre ou récipient)",
          "✓ **Indication des coordonnées du fabricant** ou de la Personne Responsable EU",
          "✓ **Numéro de référence ou de lot** permettant la traçabilité",
          "Ces mentions doivent être rédigées dans la langue officielle du pays de vente. Pour une boutique vendant en France, Allemagne et Italie, vous avez besoin de versions FR, DE et IT de l'étiquette.",
        ],
      },
      {
        heading: "Le règlement CLP et les fragrances : ce qui change selon votre recette",
        body: [
          "C'est là que beaucoup de fabricants artisanaux se retrouvent en difficulté. Si votre fragrance contient certains allergènes ou substances sensibilisantes au-delà de seuils définis, le règlement CLP impose des mentions supplémentaires.",
          "**Les allergènes IFRA** : depuis 2021, le règlement UE 2020/1378 impose la mention des allergènes aromatiques présents à plus de 0,01% dans les produits non rincés (dont les bougies). Les substances concernées incluent le limonène, le linalol, le cinnamal, l'eugénol et de nombreuses autres molécules aromatiques.",
          "**Les pictogrammes GHS** : si votre fragrance est classifiée comme mélange dangereux (inflammable, irritant, sensibilisant), vous devez apposer les pictogrammes GHS correspondants sur l'étiquette de la bougie, en plus des avertissements EN 15494.",
          "**Comment savoir si votre fragrance est concernée** : demandez à votre fournisseur de fragrance la FDS (Fiche de Données de Sécurité) au format REACH. Elle contient la classification CLP et la liste des allergènes. C'est le document de base pour rédiger votre étiquette CLP.",
        ],
      },
      {
        heading: "Le dossier technique GPSR pour une bougie : ce qu'il doit contenir",
        body: [
          "En plus de l'étiquetage, le GPSR impose un dossier technique complet pour chaque référence de bougie. Voici les éléments spécifiques aux bougies :",
          "**Description technique** : type de cire (paraffine, soja, coco, beeswax...), type de mèche (coton, bois, zinc interdit depuis 2021), fragrance (nom INCI ou FDS), colorants, contenant (verre, céramique, métal).",
          "**Analyse de risque ISO 12100** : pour une bougie, les dangers principaux à documenter sont l'incendie (flamme nue), les brûlures par contact avec la cire chaude, les émissions de COV (composés organiques volatils) en espace confiné, l'ingestion accidentelle par un enfant, et la fragmentation du contenant en verre lors d'une surchauffe.",
          "**Résultats de tests** : il n'y a pas d'obligation de tests de laboratoire externe pour les bougies artisanales à faible risque — mais vous devez au minimum documenter vos propres tests de combustion (hauteur de flamme, température du contenant, comportement à l'extinction).",
          "**Déclaration de conformité** : référençant le GPSR (UE) 2023/988 et les normes EN 15494 et EN 15493.",
        ],
      },
      {
        heading: "Les spécificités pour les bougies vendues sur Etsy, Amazon et Shopify",
        body: [
          "**Etsy** : les vendeurs de bougies sur Etsy EU sont tenus de respecter le GPSR et le CLP. Etsy peut demander la preuve de conformité pour certaines catégories. Assurez-vous que votre description produit mentionne les précautions d'utilisation.",
          "**Amazon EU** : Amazon peut demander la documentation de conformité pour les bougies dans certaines catégories. Les fiches produit doivent mentionner les avertissements de sécurité dans la langue du marché (Amazon.fr → français, Amazon.de → allemand).",
          "**Votre boutique Shopify** : vous êtes responsable de l'affichage des avertissements de sécurité sur les fiches produit. Ajoutez les mentions EN 15494 en bas de chaque fiche produit bougie, et assurez-vous que l'emballage livré inclut l'étiquette réglementaire.",
        ],
      },
      {
        heading: "Questions fréquentes sur la conformité des bougies",
        body: [
          "**Je fabrique des bougies chez moi et je vends sur Etsy. Suis-je vraiment concerné par le GPSR ?** Oui, dès que vous vendez à des consommateurs européens, que ce soit via Etsy, Instagram, votre propre site ou un marché artisanal, vous êtes soumis au GPSR. La taille de votre activité ne change rien aux obligations légales.",
          "**Je vends des bougies en cire de soja sans fragrance. Ai-je quand même besoin du dossier GPSR ?** Oui. Même sans fragrance, une bougie est un produit comportant une flamme nue — ce qui la classe automatiquement parmi les produits nécessitant une évaluation de risque documentée.",
          "**Mes étiquettes EN 15494 doivent-elles être en français si je vends uniquement en France ?** Oui. Les avertissements doivent être dans la langue officielle du pays de vente — donc en français pour les ventes en France.",
          "**Est-ce que je dois envoyer mes bougies en laboratoire ?** Pas obligatoirement pour les petits volumes. Une auto-évaluation documentée peut suffire pour les bougies à faible risque — mais vous devez la mettre par écrit dans votre dossier technique.",
        ],
      },
    ],
    conclusion: "La conformité des bougies en Europe combine GPSR, CLP et norme EN 15494 — trois corpus réglementaires qu'il faut traiter simultanément. L'étiquetage est souvent le premier point de non-conformité observé lors des contrôles. Avec la bonne méthode et un dossier technique solide, même un petit producteur artisanal peut vendre en toute légalité dans toute l'UE.",
    cta: {
      heading: "Générez votre dossier de conformité bougie",
      text: "Conforva génère le dossier technique GPSR complet pour vos bougies, incluant l'analyse de risque et les étiquettes multilingues avec les mentions EN 15494.",
      button: "Créer mon dossier bougie",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-cosmetiques-obligations-vendeurs",
    title: "GPSR et cosmétiques : ce qui change pour les fabricants et revendeurs en 2025",
    description: "Les cosmétiques sont déjà soumis au règlement (UE) 1223/2009. Avec le GPSR, de nouvelles obligations s'ajoutent. Ce guide explique ce qui change concrètement pour les marques de cosmétiques vendant en UE.",
    keywords: ["GPSR cosmétiques", "conformité cosmétiques UE", "règlement cosmétiques Europe", "dossier produit cosmétique GPSR", "CPNP cosmétiques", "RP cosmétiques EU"],
    publishedAt: "2025-06-04",
    readingTime: 7,
    category: "Réglementation",
    intro: "Si vous fabriquez ou revendez des cosmétiques — crèmes, sérums, shampoings, maquillage — vous êtes soumis à un double cadre réglementaire. Le règlement cosmétiques (CE) 1223/2009 s'applique depuis longtemps. Avec le GPSR (UE) 2023/988 entré en vigueur en décembre 2024, des obligations supplémentaires s'ajoutent. Voici ce que vous devez savoir.",
    sections: [
      {
        heading: "Cosmétiques et GPSR : qui fait quoi ?",
        body: [
          "Le règlement cosmétiques (CE) 1223/2009 est la réglementation sectorielle principale qui s'applique aux produits cosmétiques dans l'UE. Il couvre l'évaluation de la sécurité, le dossier d'information sur le produit (DIP), la notification au CPNP, l'étiquetage INCI, et la Personne Responsable EU (déjà obligatoire sous le règlement cosmétiques).",
          "Le GPSR (UE) 2023/988 s'applique en complément comme cadre général de sécurité. L'Article 2(3) du GPSR précise que les obligations du GPSR s'appliquent sauf si des dispositions spécifiques d'un autre acte législatif de l'UE s'appliquent.",
          "Concrètement, pour les cosmétiques : les obligations de sécurité du produit sont couvertes par le règlement cosmétiques 1223/2009. Mais certaines nouvelles obligations du GPSR s'ajoutent, notamment pour les places de marché et les opérateurs de distribution.",
        ],
      },
      {
        heading: "Ce que le GPSR ajoute pour les cosmétiques",
        body: [
          "Même si le règlement cosmétiques 1223/2009 reste la référence principale, le GPSR apporte plusieurs nouveautés importantes :",
          "**Obligations pour les places de marché** : si vous vendez vos cosmétiques sur Amazon, Etsy ou toute autre marketplace, ces plateformes sont désormais directement soumises au GPSR et peuvent exiger de vous une documentation complémentaire de conformité.",
          "**Traçabilité renforcée** : le GPSR renforce les obligations de traçabilité — numéro de lot obligatoire, informations permettant d'identifier la chaîne d'approvisionnement.",
          "**Notification des incidents** : le GPSR harmonise les procédures de notification des incidents graves à l'échelle EU. Si un de vos cosmétiques cause un incident sérieux (réaction allergique grave, contamination, etc.), vous avez des obligations de notification renforcées.",
          "**Opérateurs d'exécution** : si vous utilisez Amazon FBA ou un 3PL pour stocker et expédier vos cosmétiques, ces opérateurs ont également des obligations sous le GPSR.",
        ],
      },
      {
        heading: "La Personne Responsable EU : pas de changement majeur",
        body: [
          "Bonne nouvelle pour les marques de cosmétiques : la Personne Responsable EU (PR EU) était déjà obligatoire sous le règlement cosmétiques 1223/2009. Si vous avez déjà désigné une PR EU pour vos cosmétiques, cette même personne peut couvrir vos obligations GPSR.",
          "La PR EU pour les cosmétiques doit être établie dans l'UE et est responsable de la notification au CPNP (Cosmetic Products Notification Portal), de la conservation du DIP (Dossier d'Information sur le Produit) et de la disponibilité de ces informations pour les autorités.",
          "Si vous êtes une marque basée hors UE et que vous n'avez pas encore de PR EU pour vos cosmétiques, vous devez désigner une PR EU à la fois pour les obligations du règlement cosmétiques et du GPSR.",
        ],
      },
      {
        heading: "Checklist de conformité cosmétiques 2025",
        body: [
          "Pour chaque référence cosmétique vendue dans l'UE :",
          "✓ **Dossier d'Information Produit (DIP)** : évaluation de la sécurité par un évaluateur qualifié, rapport de sécurité, description du produit, méthode de fabrication, données sur les effets indésirables",
          "✓ **Notification CPNP** : notification du produit au portail CPNP avant mise sur le marché",
          "✓ **Étiquetage INCI** : liste des ingrédients selon la nomenclature INCI, mentions obligatoires (poids/volume, date d'utilisation, précautions)",
          "✓ **Personne Responsable EU** : désignée et documentée, établie dans l'UE",
          "✓ **Numéro de lot** : traçabilité obligatoire",
          "✓ **Allégations cosmétiques** : conformes au règlement (UE) 655/2013",
          "✓ **Documentation GPSR** : dossier technique complémentaire si la distribution passe par des places de marché",
        ],
      },
      {
        heading: "Amazon et les cosmétiques : ce qu'Amazon exige en 2025",
        body: [
          "Amazon EU a durci ses exigences pour les cosmétiques depuis l'entrée en vigueur du GPSR. Les vendeurs peuvent se voir demander :",
          "La preuve de notification au CPNP (un numéro de notification ou une capture d'écran du portail).",
          "Les coordonnées de la Personne Responsable EU dans Seller Central.",
          "L'étiquetage complet et conforme au règlement 1223/2009 sur les photos produit.",
          "Pour certaines catégories à risque (produits pour enfants, produits avec des allégations médicales), Amazon peut demander le rapport d'évaluation de sécurité complet.",
          "Les cosmétiques vendus sans notification CPNP ou sans PR EU correctement documentée peuvent être suspendus sur Amazon EU.",
        ],
      },
    ],
    conclusion: "Les cosmétiques bénéficient d'un cadre réglementaire sectoriel solide (règlement 1223/2009) qui couvre l'essentiel. Le GPSR s'y ajoute en renforçant certaines obligations de traçabilité et en impliquant directement les places de marché. Pour les marques déjà conformes au règlement cosmétiques, la mise à niveau GPSR est généralement limitée — mais pour celles qui ne l'étaient pas encore, c'est l'occasion de régulariser l'ensemble.",
    cta: {
      heading: "Documentez vos cosmétiques avec Conforva",
      text: "Générez le dossier technique GPSR complémentaire pour vos cosmétiques — analyse de risque, déclaration de conformité et étiquettes multilingues.",
      button: "Démarrer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-etsy-guide-vendeurs",
    title: "GPSR sur Etsy : guide complet pour les vendeurs artisanaux en Europe",
    description: "Vous vendez sur Etsy et livrez en Europe ? Le GPSR s'applique à vous dès la première vente. Découvrez vos obligations réelles, les démarches simples et comment vous mettre en conformité sans expertise juridique.",
    keywords: ["GPSR Etsy", "Etsy conformité UE", "GPSR vendeur Etsy", "Etsy règlement produit sécurité", "conformité artisanat EU", "GPSR créateurs Etsy"],
    publishedAt: "2025-06-05",
    readingTime: 6,
    category: "Cas d'usage",
    intro: "Si vous êtes créateur ou artisan sur Etsy et que vous livrez en France, en Belgique, en Allemagne ou dans tout autre pays de l'UE, le GPSR (UE) 2023/988 s'applique à vous — même si vous vendez à titre complémentaire, même si vous faites tout à la main chez vous. Ce guide vous explique vos obligations réelles et comment les remplir sans vous ruiner.",
    sections: [
      {
        heading: "Le GPSR s'applique-t-il aux petits vendeurs Etsy ?",
        body: [
          "Oui — sans exception de taille ni de chiffre d'affaires. Le règlement GPSR ne prévoit pas de seuil minimal. Qu'il s'agisse d'un auto-entrepreneur vendant 10 bougies par mois ou d'une PME gérant des milliers de commandes, les obligations s'appliquent dès lors que des produits physiques sont vendus à des consommateurs de l'UE.",
          "La réalité pratique : les contrôles de la DGCCRF (France) ou des autorités équivalentes ciblent en priorité les grandes plateformes et les produits à risque élevé. Un petit vendeur Etsy artisanal n'est pas la cible principale des autorités — mais il n'est pas exempt pour autant.",
          "Surtout : Etsy peut vous demander une documentation de conformité pour certaines catégories de produits. Si vous ne pouvez pas la fournir, votre boutique risque une suspension de catégorie.",
        ],
      },
      {
        heading: "Ce qu'Etsy exige concrètement",
        body: [
          "Etsy est une marketplace soumise au GPSR en tant qu'opérateur de marché en ligne. Cela signifie qu'Etsy a l'obligation légale de vérifier la conformité des produits vendus sur sa plateforme pour les ventes vers l'UE.",
          "En pratique, Etsy peut :",
          "Vous envoyer des notifications vous demandant de confirmer que vos produits sont conformes au GPSR pour les catégories à risque.",
          "Suspendre des annonces ou votre boutique entière si vous ne répondez pas aux demandes de conformité.",
          "Vous demander de mettre à jour vos fiches produit pour inclure les avertissements de sécurité obligatoires.",
          "Pour les catégories les plus contrôlées sur Etsy : jouets et jeux pour enfants, produits pour bébés, bougies et produits inflammables, bijoux et accessoires pour enfants, cosmétiques fait-maison.",
        ],
      },
      {
        heading: "Les 4 documents essentiels pour un vendeur Etsy",
        body: [
          "En tant que petit vendeur Etsy, vous n'avez pas besoin d'un cabinet juridique ou d'une agence de conformité. Voici les 4 documents de base que vous devez avoir pour chaque produit vendu en UE :",
          "**1. Le dossier technique simplifié** : pour un produit artisanal simple, le dossier peut être court (2 à 5 pages) : description du produit, matériaux utilisés, usage prévu, évaluation des dangers principaux et mesures prises pour les réduire. L'essentiel est que ce document existe et soit archivé.",
          "**2. L'analyse de risque** : identifiez les 2 à 4 dangers principaux de votre produit (coupure, ingestion, allergie, incendie...) et documentez ce que vous avez fait pour les réduire (matériaux sûrs, étiquettes d'avertissement, instructions d'usage).",
          "**3. La déclaration de conformité** : un document d'une page signé par vous, indiquant que le produit est conforme au GPSR. Peut être généré facilement.",
          "**4. L'étiquetage** : vos produits doivent porter vos coordonnées (nom, adresse ou email), une référence permettant d'identifier le produit, et les avertissements de sécurité pertinents dans la langue du pays de livraison.",
        ],
      },
      {
        heading: "Comment mettre à jour vos fiches Etsy pour la conformité",
        body: [
          "La conformité GPSR se voit également dans vos fiches produit Etsy. Voici ce qu'il faut ajouter :",
          "**Dans la description produit** : mentionnez les matériaux utilisés, les précautions d'utilisation, et les restrictions d'âge le cas échéant (ex. : « Non adapté aux enfants de moins de 3 ans »).",
          "**Dans la section « Informations légales »** : Etsy propose des champs pour les informations réglementaires. Renseignez les coordonnées de votre entreprise ou de votre Personne Responsable EU si applicable.",
          "**Sur l'emballage physique** : incluez une étiquette ou une notice avec les avertissements de sécurité dans la langue du client. Pour les livraisons vers la France, l'Allemagne et le Royaume-Uni, vous aurez besoin de versions FR, DE et EN.",
        ],
      },
      {
        heading: "Le cas particulier des vendeurs Etsy basés hors UE",
        body: [
          "Si vous êtes basé aux États-Unis, au Canada, en Australie ou dans tout autre pays hors UE, et que vous livrez en Europe, vous devez désigner une Personne Responsable EU (Article 16 GPSR). C'est l'obligation qui surprend le plus les vendeurs Etsy internationaux.",
          "Pour un petit vendeur avec quelques ventes EU par mois, il existe des solutions économiques : certains prestataires proposent le service de PR EU pour 100 à 200 €/an. Cette personne sert de point de contact légal en Europe sans que vous ayez à y ouvrir une structure.",
          "Attention : si vous vendez uniquement au Royaume-Uni, vous n'avez pas besoin d'une PR EU — mais vous pouvez avoir besoin d'un UK Responsible Person sous la législation britannique (UK PSMB).",
        ],
      },
    ],
    conclusion: "Le GPSR s'applique à tous les vendeurs Etsy qui livrent en Europe — sans exception. La bonne nouvelle : pour les créateurs et artisans, la mise en conformité n'exige pas un budget considérable. Un dossier technique simplifié, une déclaration de conformité et un étiquetage correct suffisent pour la grande majorité des produits artisanaux. L'important est de le faire avant d'être contacté par Etsy ou les autorités.",
    cta: {
      heading: "Mettez votre boutique Etsy en conformité",
      text: "Créez le dossier technique GPSR pour vos produits Etsy en quelques minutes. Gratuit pour votre première référence, sans expertise juridique requise.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-faq-questions-frequentes",
    title: "GPSR : les 20 questions les plus fréquentes des e-commerçants (FAQ 2025)",
    description: "Tout ce que vous avez toujours voulu savoir sur le GPSR : suis-je concerné, quels documents, quel coût, Amazon, Etsy, dropshipping, bougies, jouets, cosmétiques. Réponses claires et directes.",
    keywords: ["GPSR FAQ", "questions GPSR", "GPSR suis-je concerné", "GPSR obligation e-commerce", "GPSR comment se mettre en conformité", "GPSR expliqué simplement"],
    publishedAt: "2025-06-05",
    readingTime: 9,
    category: "Réglementation",
    intro: "Le GPSR suscite beaucoup de questions — et souvent de l'inquiétude. Suis-je vraiment concerné ? Qu'est-ce que je risque concrètement ? Combien ça coûte de se mettre en conformité ? Voici les réponses claires aux 20 questions que posent le plus souvent les e-commerçants.",
    sections: [
      {
        heading: "Questions de base : suis-je concerné ?",
        body: [
          "**1. Je vends des produits fabriqués en Chine sur Amazon. Suis-je concerné par le GPSR ?** Oui, directement. En tant qu'importateur (vous mettez des produits fabriqués hors UE sur le marché européen), vous avez des obligations complètes : dossier technique, déclaration de conformité, désignation d'une Personne Responsable EU, étiquetage multilingue.",
          "**2. Je fais du dropshipping et je ne touche jamais les produits. Dois-je me conformer au GPSR ?** Oui. Le fait de ne pas stocker les produits ne vous exempte pas. Dès que vous proposez un produit à un consommateur européen, vous êtes considéré comme distributeur au sens du GPSR. Si vous sourcez depuis des fournisseurs hors UE, vous pouvez même être qualifié d'importateur.",
          "**3. Je vends uniquement en France. Quel règlement s'applique ?** Le GPSR est un règlement européen directement applicable dans tous les États membres, dont la France. Il n'y a pas de version française du GPSR — c'est le texte UE qui s'applique. La DGCCRF est l'autorité nationale française chargée de le faire respecter.",
          "**4. Je vends à la fois en France et en dehors de l'UE. Le GPSR s'applique-t-il pour toutes mes ventes ?** Seulement pour les ventes vers les consommateurs de l'UE. Vos ventes aux États-Unis, au Royaume-Uni ou en Australie sont soumises à leurs propres réglementations locales, pas au GPSR.",
          "**5. Mon produit est déjà certifié CE. Suis-je automatiquement conforme au GPSR ?** Pas nécessairement. Le marquage CE atteste la conformité à une ou plusieurs directives sectorielles (directive jouets, LVD, RED, etc.). Le GPSR ajoute des obligations supplémentaires — notamment le dossier technique Article 22, la Personne Responsable EU et les obligations des places de marché — qui ne sont pas couvertes par le simple marquage CE.",
        ],
      },
      {
        heading: "Questions sur les documents requis",
        body: [
          "**6. Quels documents dois-je avoir pour chaque produit ?** Au minimum : un dossier technique (15 sections, Art. 22), une analyse de risque ISO 12100, une déclaration UE de conformité (Art. 24), un étiquetage avec avertissements dans les langues des pays de vente, et pour les fabricants hors UE, la désignation d'une Personne Responsable EU.",
          "**7. Combien de temps dois-je conserver le dossier technique ?** 10 ans à compter de la mise sur le marché du dernier exemplaire du produit. C'est une obligation légale, pas une recommandation.",
          "**8. La déclaration de conformité doit-elle être traduite dans toutes les langues des pays de vente ?** Non. La déclaration de conformité peut être rédigée dans une seule langue (généralement français ou anglais). Ce qui doit être traduit, c'est l'étiquetage de sécurité sur le produit et les instructions d'utilisation.",
          "**9. Est-ce que je dois faire des tests en laboratoire pour mon produit ?** Pas pour tous les produits. Les tests de laboratoire sont obligatoires pour certaines catégories spécifiques (jouets EN 71, électronique, produits pour enfants de moins de 3 ans). Pour les produits à faible risque (décoration, papeterie, textiles simples), une auto-évaluation documentée peut suffire.",
        ],
      },
      {
        heading: "Questions sur Amazon, Etsy et les plateformes",
        body: [
          "**10. Amazon a suspendu mon annonce pour non-conformité GPSR. Comment réactiver ?** Rassemblez les documents demandés (dossier technique, déclaration de conformité, coordonnées Personne Responsable EU) et soumettez-les via Seller Central dans la section Conformité. Les délais de traitement varient de quelques jours à plusieurs semaines.",
          "**11. Etsy m'a envoyé une notification GPSR. Que dois-je faire ?** Répondez à la notification avec les documents demandés. Si vous n'avez pas encore de dossier technique, il est urgent d'en constituer un. Ignorer la notification peut entraîner une suspension de vos annonces concernées.",
          "**12. Shopify vérifie-t-il la conformité GPSR de mes produits ?** Non, Shopify n'est pas une place de marché au sens du GPSR — c'est un prestataire technique. La vérification de votre conformité incombe aux autorités nationales (DGCCRF en France), pas à Shopify. Mais vous restez responsable.",
        ],
      },
      {
        heading: "Questions sur les coûts et la mise en pratique",
        body: [
          "**13. Combien coûte la mise en conformité GPSR ?** Cela dépend du produit et de la méthode. Faire appel à un consultant en conformité : 500 à 2 000 € par référence. Utiliser un outil comme Conforva : de 0 à quelques dizaines d'euros par référence. Les tests de laboratoire (quand obligatoires) : de 200 à 1 500 € selon la catégorie.",
          "**14. Combien de temps prend la constitution d'un dossier technique ?** Avec un outil adapté : 15 à 30 minutes par référence. Manuellement, sans outil : 2 à 5 jours de travail pour quelqu'un qui ne connaît pas le GPSR.",
          "**15. Je vends 50 références. Par où commencer ?** Priorisez par risque : commencez par les produits pour enfants, l'électronique et les produits avec des composants chimiques. Ensuite les produits à forte rotation. Enfin les références à faible risque.",
          "**16. Est-ce que je peux utiliser le même dossier technique pour plusieurs variantes d'un même produit ?** Partiellement. Si les variantes (différentes couleurs, tailles) partagent la même conception et les mêmes matériaux, un seul dossier peut couvrir toutes les variantes avec des annexes spécifiques. Si les matériaux ou la construction diffèrent significativement, un dossier distinct est recommandé.",
        ],
      },
      {
        heading: "Questions sur les sanctions",
        body: [
          "**17. Qu'est-ce que je risque concrètement si je ne me conforme pas ?** Suspension des annonces sur Amazon EU et les autres places de marché (immédiate), contrôle et injonction de la DGCCRF (amendes administratives), blocage douanier de vos marchandises, et en cas d'accident causé par un produit non conforme, responsabilité civile et potentiellement pénale.",
          "**18. La DGCCRF contrôle-t-elle vraiment les petits vendeurs en ligne ?** Les contrôles ciblent en priorité les produits à risque élevé et les grandes plateformes. Mais les petits vendeurs ne sont pas immunisés — surtout pour les catégories sensibles (jouets, bougies, électronique, produits enfants). Les contrôles en ligne se font aussi par des achats tests.",
          "**19. Si je ne suis pas en conformité aujourd'hui, est-ce que je risque des sanctions rétroactives ?** Le GPSR n'est pas rétroactif pour les produits mis sur le marché avant décembre 2024. Mais pour les produits que vous continuez à vendre aujourd'hui, les obligations s'appliquent en temps réel.",
          "**20. Un client a été blessé par mon produit. Que se passe-t-il ?** Si vous avez un dossier technique conforme, vous pouvez démontrer votre bonne foi. Sans dossier technique, l'absence de documentation est interprétée comme une négligence — ce qui aggrave votre responsabilité civile et peut ouvrir la voie à des poursuites pénales. C'est la raison principale pour laquelle la documentation GPSR est critique.",
        ],
      },
    ],
    conclusion: "Le GPSR n'est pas fait pour décourager les petits vendeurs — il est fait pour protéger les consommateurs. La plupart des obligations sont raisonnables et accessibles même sans expertise juridique. Ce qui compte, c'est d'agir : constituer les dossiers pour vos produits les plus à risque, puis élargir progressivement à l'ensemble de votre catalogue.",
    cta: {
      heading: "Passez à l'action : générez votre premier dossier GPSR",
      text: "Conforva répond à toutes ces questions en vous générant directement les documents : dossier technique, analyse de risque, déclaration de conformité. Gratuit pour votre première référence.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-electronique-obligations-vendeurs",
    title: "GPSR et produits électroniques : obligations, marquage CE et directives applicables",
    description: "Vous vendez des produits électroniques en Europe ? GPSR, directive LVD, CEM, RED, RoHS : découvrez toutes les obligations pour mettre votre électronique en conformité sur le marché EU.",
    keywords: ["GPSR électronique", "directive LVD conformité", "marquage CE électronique", "RED GPSR", "RoHS conformité", "dossier technique électronique UE", "conformité produit électrique Europe"],
    publishedAt: "2025-06-06",
    readingTime: 8,
    category: "Réglementation",
    intro: "Les produits électroniques et électriques sont parmi les plus réglementés en Europe. En plus du GPSR (UE) 2023/988, ils sont soumis à plusieurs directives sectorielles : la directive Basse Tension (LVD), la directive CEM (compatibilité électromagnétique), la directive RED pour les appareils radio, et RoHS pour les substances dangereuses. Voici ce que vous devez savoir pour vendre légalement.",
    sections: [
      {
        heading: "Quelles directives s'appliquent à votre produit électronique ?",
        body: [
          "**Directive Basse Tension (LVD) 2014/35/UE** : s'applique aux équipements électriques alimentés entre 50V et 1000V AC (ou 75V et 1500V DC). Couvre la grande majorité des appareils électroménagers, chargeurs, lampes, appareils de cuisson et équipements de bureau.",
          "**Directive CEM 2014/30/UE** : s'applique à tout équipement susceptible de provoquer des perturbations électromagnétiques ou d'en être affecté. Presque tous les appareils électroniques sont concernés.",
          "**Directive RED 2014/53/UE** : obligatoire pour tout produit émettant ou recevant des ondes radio — smartphones, tablettes, enceintes Bluetooth, routeurs WiFi, objets connectés IoT, drones.",
          "**Directive RoHS 2011/65/UE** : restreint l'utilisation de 10 substances dangereuses dans les équipements électriques et électroniques (plomb, mercure, cadmium, chrome hexavalent, PBB, PBDE, DEHP, BBP, DBP, DIBP). S'applique à pratiquement tout l'électronique grand public.",
          "**GPSR (UE) 2023/988** : s'applique en complément de toutes ces directives, ajoutant les obligations de dossier technique Article 22, de Personne Responsable EU et d'analyse de risque documentée.",
        ],
      },
      {
        heading: "Le marquage CE pour l'électronique : comment le justifier",
        body: [
          "Le marquage CE sur un produit électronique n'est pas une certification achetée — c'est une auto-déclaration du fabricant. Pour être légitime, il doit reposer sur une évaluation de conformité solide et documentée.",
          "Pour apposer le CE sur un produit électronique, vous devez : identifier toutes les directives applicables, réaliser les tests de conformité selon les normes harmonisées (EN 62368-1 pour la sécurité électrique, EN 55032 pour les émissions CEM, etc.), rédiger la déclaration de conformité, et constituer le dossier technique.",
          "Les tests pour l'électronique nécessitent généralement un laboratoire accrédité ISO 17025, sauf pour certains produits à très faible risque électrique. Le coût d'un test complet LVD + CEM varie de 800 à 3 000 € selon la complexité du produit.",
          "Attention au marquage CE de fabricants chinois : le signe « CE » sur de nombreux produits importés de Chine signifie « China Export » et n'a aucune valeur réglementaire européenne. Ne l'apposez pas sans avoir réalisé les évaluations requises.",
        ],
      },
      {
        heading: "RoHS : les 10 substances à vérifier absolument",
        body: [
          "La directive RoHS interdit ou limite 10 substances dans les produits électroniques vendus dans l'UE. Voici les seuils à respecter :",
          "Plomb (Pb) : max 0,1% en poids par matériau homogène. Mercure (Hg) : max 0,1%. Cadmium (Cd) : max 0,01%. Chrome hexavalent (Cr6+) : max 0,1%. PBB et PBDE (retardateurs de flamme) : max 0,1% chacun. DEHP, BBP, DBP, DIBP (phtalates) : max 0,1% chacun.",
          "Pour démontrer la conformité RoHS, demandez à votre fabricant les rapports de tests RoHS par laboratoire accrédité (XRF screening + ICP analysis). Ces rapports doivent figurer dans votre dossier technique et être conservés 10 ans.",
          "Attention : RoHS s'applique non seulement au produit fini mais aussi aux accessoires et emballages électroniques fournis avec le produit.",
        ],
      },
      {
        heading: "Objets connectés et IoT : les obligations spécifiques",
        body: [
          "Les objets connectés (IoT) cumulent les obligations de la directive RED et du GPSR. La directive RED 2014/53/UE impose des exigences de cybersécurité renforcées depuis août 2025 pour les appareils IoT accessibles à internet.",
          "Ces nouvelles exigences RED incluent : protection contre les accès non autorisés (authentification obligatoire), protection des données personnelles intégrées dès la conception, et résistance aux attaques réseau documentée.",
          "Pour les drones, la réglementation est encore plus stricte : en plus de la RED et du GPSR, ils sont soumis au règlement EU 2019/945 sur les systèmes d'aéronefs sans équipage.",
          "Conseil pratique : si vous sourcez des objets connectés depuis la Chine, vérifiez systématiquement que les firmwares peuvent être mis à jour (exigence de sécurité RED) et que les données ne sont pas transmises à des serveurs hors conformité RGPD.",
        ],
      },
      {
        heading: "Checklist conformité électronique pour vendeurs Amazon et Shopify",
        body: [
          "✓ Identification des directives applicables (LVD / CEM / RED / RoHS selon le produit)",
          "✓ Tests de conformité par laboratoire accrédité ISO 17025 (EN 62368-1, EN 55032, etc.)",
          "✓ Rapport RoHS avec seuils vérifiés pour chaque substance",
          "✓ Déclaration UE de conformité signée (listant toutes les directives)",
          "✓ Dossier technique complet Art. 22 GPSR",
          "✓ Marquage CE visible sur le produit (hauteur min. 5 mm, indélébile)",
          "✓ Personne Responsable EU désignée et documentée (pour fabricants hors UE)",
          "✓ Étiquette avec coordonnées fabricant/PR EU, référence produit, tension d'alimentation",
          "✓ Instructions d'utilisation dans la langue du pays de vente",
          "✓ Enregistrement DEEE (déchets d'équipements électriques) si ventes directes aux consommateurs EU",
        ],
      },
    ],
    conclusion: "Les produits électroniques cumulent plusieurs cadres réglementaires — ce qui en fait l'une des catégories les plus exigeantes à gérer pour un e-commerçant. La bonne approche est de traiter toutes les directives ensemble plutôt que séparément : un seul dossier technique bien structuré peut documenter la conformité LVD + CEM + RED + RoHS + GPSR. Commencez par les tests obligatoires, puis construisez la documentation autour des résultats.",
    cta: {
      heading: "Générez votre dossier technique électronique",
      text: "Conforva structure le dossier technique GPSR pour vos produits électroniques, incluant les sections RoHS, RED et marquage CE.",
      button: "Créer mon dossier électronique",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-textile-vetements-obligations",
    title: "GPSR et textiles : obligations pour les vendeurs de vêtements en Europe",
    description: "Vêtements, accessoires textiles, tapis — le GPSR s'applique. Découvrez les obligations REACH, l'étiquetage fibres, les tests OEKO-TEX et comment constituer votre dossier technique textile.",
    keywords: ["GPSR textile", "conformité vêtements UE", "REACH textiles", "étiquetage textile Europe", "dossier technique vêtement GPSR", "OEKO-TEX conformité", "vendre vêtements en ligne Europe"],
    publishedAt: "2025-06-06",
    readingTime: 7,
    category: "Réglementation",
    intro: "Les vêtements et textiles semblent à faible risque — mais le GPSR, combiné au règlement REACH et aux obligations d'étiquetage fibres, impose un cadre précis. Que vous vendiez des t-shirts, des leggings, des tapis ou des draps, voici ce que vous devez savoir avant de vendre en Europe.",
    sections: [
      {
        heading: "Quelles réglementations s'appliquent aux textiles ?",
        body: [
          "**GPSR (UE) 2023/988** : le cadre général de sécurité. Pour les textiles, il impose un dossier technique avec analyse de risque (inflammabilité, agents chimiques, risques mécaniques pour les enfants) et une déclaration de conformité.",
          "**Règlement REACH (CE) 1907/2006** : restreint les substances chimiques dans les textiles. Les teintures azoïques, les formaldéhydes, le chrome VI, les phtalates, les alkylphénols (APE) utilisés dans les apprêts textiles sont les principales substances à vérifier.",
          "**Règlement fibres textiles (UE) 1007/2011** : impose la mention de la composition en fibres sur l'étiquette de tout article textile vendu dans l'UE. La liste INCI des fibres et les dénominations réglementaires doivent être respectées.",
          "**Directive DEEE** : s'applique aux textiles « intelligents » (vêtements connectés avec composants électroniques).",
          "Pour les textiles destinés aux enfants de moins de 14 ans : exigences renforcées sur les cordons et liens (norme EN 14682), les petites pièces et les substances chimiques.",
        ],
      },
      {
        heading: "L'étiquetage textile obligatoire",
        body: [
          "Chaque article textile vendu dans l'UE doit comporter une étiquette avec :",
          "**La composition en fibres** : pourcentages et dénominations réglementaires (ex : « 80% coton, 20% polyester »). La tolérance est de ±3% en fabrication industrielle.",
          "**Les instructions d'entretien** : symboles de lavage, séchage, repassage, nettoyage à sec selon la norme ISO 3758.",
          "**Le pays de fabrication** : mention « Fabriqué en [pays] » recommandée (obligatoire dans certains États membres).",
          "**Les coordonnées du fabricant ou de la Personne Responsable EU** : obligatoires sous le GPSR.",
          "Ces informations doivent figurer dans la langue officielle du pays de vente. Pour un e-commerçant vendant en France, Allemagne et Espagne, l'étiquette doit être dans ces trois langues.",
        ],
      },
      {
        heading: "REACH et textiles : les substances à vérifier",
        body: [
          "Le règlement REACH impose des restrictions strictes sur plusieurs substances utilisées dans la fabrication textile. Les principales à surveiller :",
          "**Amines aromatiques issues de teintures azoïques** : interdites au-delà de 30 mg/kg dans les textiles qui entrent en contact prolongé avec la peau. Test requis : EN ISO 14362-1.",
          "**Formaldéhyde** : limité à 75 mg/kg pour les textiles pour bébés et nourrissons, 300 mg/kg pour les articles non directement en contact avec la peau. Test : EN ISO 14184-1.",
          "**Chrome VI** : interdit dans les cuirs et similicuirs > 3 mg/kg. Très important pour les ceintures, sacs et chaussures.",
          "**Phtalates** (DEHP, BBP, DBP, DIBP) : interdits au-delà de 0,1% dans les articles en PVC souple, incluant les imprimés sur textiles.",
          "Pour vérifier la conformité REACH de vos textiles, demandez un rapport de test REACH à votre fournisseur ou faites réaliser un test en laboratoire accrédité. Le coût d'un panel REACH textile est de 150 à 400 €.",
        ],
      },
      {
        heading: "Textiles pour enfants : les précautions spécifiques",
        body: [
          "Les vêtements et textiles pour enfants ont des exigences renforcées qui vont au-delà des obligations générales :",
          "**Norme EN 14682** : interdit les cordons fonctionnels au niveau du cou et de la capuche pour les enfants de moins de 7 ans, et impose des longueurs maximales pour les cordons sur les autres parties du vêtement pour les enfants jusqu'à 14 ans.",
          "**Petites pièces et accessoires** : boutons, pressions, ornements décoratifs doivent résister à des tests de traction et de torsion. Tout élément pouvant se détacher représente un risque d'étouffement.",
          "**Inflammabilité** : les vêtements de nuit pour enfants doivent satisfaire à des exigences de résistance au feu selon EN 14878.",
          "Ces contraintes s'appliquent aux vêtements pour enfants jusqu'à 14 ans. Documentez systématiquement ces éléments dans votre analyse de risque.",
        ],
      },
      {
        heading: "OEKO-TEX, GOTS, bluesign : des certifications utiles mais pas suffisantes",
        body: [
          "Les certifications volontaires comme OEKO-TEX Standard 100, GOTS (Global Organic Textile Standard) ou bluesign attestent de la qualité environnementale et/ou sanitaire des textiles. Elles sont utiles commercialement et couvrent une grande partie des exigences REACH.",
          "Cependant, elles ne remplacent pas le dossier technique GPSR ni la déclaration de conformité. Ce sont des outils complémentaires qui facilitent la constitution du dossier : un textile certifié OEKO-TEX Standard 100 a des rapports de test qui peuvent alimenter directement votre section REACH du dossier technique.",
          "Si votre fournisseur fournit un certificat OEKO-TEX valide, utilisez-le comme pièce jointe dans votre dossier technique — ça simplifie considérablement votre travail de conformité.",
        ],
      },
    ],
    conclusion: "Les textiles ne sont pas la catégorie la plus complexe du GPSR — mais ils ne sont pas exemptés non plus. L'étiquetage fibres, les restrictions REACH sur les teintures et apprêts, et les règles spécifiques pour les vêtements enfants sont les trois points à traiter en priorité. Avec un fournisseur qui fournit les rapports de tests, la conformité textile est accessible même pour un petit e-commerçant.",
    cta: {
      heading: "Générez votre dossier technique textile",
      text: "Conforva génère le dossier technique GPSR pour vos textiles et vêtements, avec l'analyse de risque REACH et les étiquettes multilingues.",
      button: "Créer mon dossier textile",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-import-chine-guide-importateurs",
    title: "Importer depuis la Chine et vendre en Europe : guide GPSR complet 2025",
    description: "Vous importez depuis la Chine pour vendre en Europe ? Vous êtes importateur au sens du GPSR. Découvrez vos obligations, comment travailler avec vos fournisseurs chinois et éviter les blocages douaniers.",
    keywords: ["importer Chine Europe GPSR", "importateur GPSR obligations", "sourcing Chine conformité UE", "fournisseur chinois GPSR", "dossier technique import Chine", "douane UE conformité produit"],
    publishedAt: "2025-06-06",
    readingTime: 8,
    category: "Cas d'usage",
    intro: "Des milliers de vendeurs européens sourcent leurs produits en Chine — Alibaba, 1688, agents sourcing, usines directes. Si vous achetez des produits fabriqués en Chine et que vous les vendez à des consommateurs européens, vous êtes importateur au sens du GPSR. Vos obligations sont plus étendues que celles d'un simple distributeur. Voici ce que vous devez faire.",
    sections: [
      {
        heading: "Importateur vs distributeur : pourquoi la différence compte",
        body: [
          "Le GPSR définit l'importateur comme « toute personne physique ou morale établie dans l'UE qui met sur le marché de l'Union un produit provenant d'un pays tiers ». Si vous achetez des produits en Chine et les vendez en Europe — même en dropshipping depuis un entrepôt chinois — vous pouvez être qualifié d'importateur.",
          "Les obligations de l'importateur sont plus lourdes que celles du distributeur : vérification de la conformité GPSR du produit avant mise sur le marché (pas seulement après), obligation d'apposer son nom et adresse sur le produit ou l'emballage, responsabilité partagée si le produit cause un dommage.",
          "Contrairement au distributeur qui peut se contenter de vérifier que la documentation existe, l'importateur doit s'assurer que le dossier technique et la déclaration de conformité sont effectivement conformes aux exigences GPSR.",
        ],
      },
      {
        heading: "Comment travailler avec vos fournisseurs chinois sur la conformité",
        body: [
          "La première étape est de comprendre ce que vos fournisseurs chinois peuvent vous fournir. Les bons fournisseurs sur Alibaba pour les catégories populaires ont souvent des rapports de tests et des déclarations de conformité — mais leur qualité varie énormément.",
          "Demandez systématiquement à vos fournisseurs : les rapports de tests GPSR/CE disponibles (précisez la norme — EN 71 pour jouets, EN 62368 pour électronique, etc.), les fiches de données de sécurité (FDS) pour les produits chimiques ou les matériaux à risque, la liste des substances REACH/RoHS (pour l'électronique et les textiles), et toute déclaration de conformité existante.",
          "Évaluez la qualité de la documentation reçue : un rapport de test d'un laboratoire accrédité ISO 17025 (SGS, Bureau Veritas, Intertek, TÜV) a une valeur réelle. Un document générique sans numéro de rapport et sans laboratoire identifiable n'en a aucune.",
          "Si votre fournisseur ne peut rien fournir, vous avez deux options : changer de fournisseur, ou faire réaliser vous-même les tests et constituer le dossier technique. Cette seconde option est possible et souvent moins coûteuse qu'on ne le croit.",
        ],
      },
      {
        heading: "Les vérifications douanières : ce qu'il faut avoir prêt",
        body: [
          "Les douanes européennes ont le droit de bloquer tout produit dont la conformité GPSR n'est pas démontrée. Depuis l'entrée en vigueur du GPSR en décembre 2024, les contrôles se sont intensifiés sur les catégories à risque.",
          "Pour éviter un blocage douanier, préparez pour chaque container ou expédition : la déclaration de conformité CE (ou GPSR) signée, la liste des normes appliquées, le dossier technique ou une référence à son emplacement (peut être numérique), et les coordonnées de la Personne Responsable EU.",
          "Ces documents ne doivent pas nécessairement être sur le produit lui-même — ils doivent être disponibles sur demande des autorités douanières dans un délai raisonnable. Avoir un dossier numérique accessible est suffisant.",
          "En cas de blocage, le processus de déblocage peut prendre 2 à 6 semaines et engendre des frais de stockage en entrepôt douanier. Le coût d'un blocage dépasse souvent largement le coût de la mise en conformité préventive.",
        ],
      },
      {
        heading: "Les catégories les plus contrôlées à l'import depuis la Chine",
        body: [
          "Toutes les catégories ne sont pas contrôlées avec la même intensité. Les douanes et la DGCCRF ciblent en priorité :",
          "**Jouets et produits pour enfants** : catégorie la plus surveillée. EN 71, marquage CE, Personne Responsable EU — tout est vérifié. Les peluches, figurines, jouets électroniques sont dans le collimateur.",
          "**Produits électroniques** : chargeurs, lampes LED, enceintes Bluetooth, objets connectés. Tests LVD + CEM souvent absents sur les produits sourçés sur AliExpress.",
          "**Cosmétiques et soins** : crèmes, parfums, produits de beauté. Notification CPNP et évaluation sécurité par évaluateur qualifié obligatoires.",
          "**Éclairage LED** : directive LVD + CEM + règlement écoconception. Beaucoup de produits LED d'origine chinoise ont de faux marquages CE.",
          "**Produits alimentaires en contact** : vaisselle, ustensiles de cuisine. Migration des substances chimiques (plomb, cadmium) réglementée.",
        ],
      },
      {
        heading: "Stratégie pratique pour un importateur qui gère un catalogue de 20 à 100 références",
        body: [
          "**Étape 1 — Classification par risque** : divisez votre catalogue en trois groupes. Risque élevé (jouets, électronique, produits enfants, cosmétiques) → priorité immédiate. Risque moyen (textiles, décoration, cuisine) → dans les 3 mois. Risque faible (papeterie, accessoires simples) → à terme.",
          "**Étape 2 — Collecte documentaire fournisseurs** : pour chaque référence prioritaire, contactez votre fournisseur avec une liste structurée des documents demandés. Beaucoup de fournisseurs ont les documents mais ne les transmettent pas spontanément.",
          "**Étape 3 — Génération des dossiers techniques** : pour les références sans documentation suffisante, utilisez un outil de génération pour créer le dossier technique GPSR. Alimentez-le avec les informations produit disponibles et complétez avec votre propre évaluation.",
          "**Étape 4 — Désignation PR EU** : si ce n'est pas déjà fait, désignez une Personne Responsable EU pour votre gamme de produits.",
          "**Étape 5 — Mise à jour étiquetage** : ajoutez vos coordonnées (importateur EU) sur les produits ou les emballages pour la prochaine commande.",
        ],
      },
    ],
    conclusion: "Importer depuis la Chine et vendre en Europe est une activité économique majeure — mais le GPSR a changé les règles. Les importateurs ont des responsabilités réelles et documentaires qu'ils ne peuvent pas simplement déléguer à leur fournisseur chinois. La bonne nouvelle : avec une approche structurée et les bons outils, un catalogue de 50 références peut être mis en conformité en quelques jours de travail.",
    cta: {
      heading: "Mettez votre catalogue d'import en conformité",
      text: "Gérez la conformité GPSR de tout votre catalogue d'importation depuis Conforva. Import CSV, génération en masse, dossiers prêts pour les douanes.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-woocommerce-boutique-conformite",
    title: "WooCommerce et GPSR : comment mettre votre boutique WordPress en conformité",
    description: "Votre boutique WooCommerce vend en Europe ? Découvrez comment intégrer la conformité GPSR dans votre workflow WooCommerce : imports produits, affichage des données de sécurité et documentation.",
    keywords: ["GPSR WooCommerce", "WooCommerce conformité UE", "WordPress GPSR", "boutique WooCommerce conformité produit", "GPSR e-commerce WordPress 2025"],
    publishedAt: "2025-06-06",
    readingTime: 6,
    category: "Cas d'usage",
    intro: "WooCommerce est la plateforme e-commerce open-source la plus utilisée en Europe. Si votre boutique WordPress/WooCommerce vend à des consommateurs de l'UE, le GPSR s'applique à vous — exactement comme pour Shopify ou Amazon. Voici comment gérer cette conformité sans perturber votre workflow habituel.",
    sections: [
      {
        heading: "WooCommerce et le GPSR : vos responsabilités",
        body: [
          "WooCommerce est un plugin WordPress — un outil technique. Il n'a pas d'obligations directes sous le GPSR. C'est vous, le marchand, qui êtes responsable de la conformité des produits que vous vendez.",
          "Contrairement à Amazon (qui peut suspendre vos annonces) ou Etsy (qui peut fermer votre boutique), WooCommerce ne vous enverra jamais de notification de non-conformité GPSR. La pression vient des autorités nationales : DGCCRF en France, Gewerbeaufsicht en Allemagne, NVWA aux Pays-Bas.",
          "Les contrôles des boutiques WooCommerce existent — les autorités font des achats tests, contrôlent les informations produit et peuvent vous contacter directement. L'absence d'action des plateformes ne signifie pas l'absence de risque.",
        ],
      },
      {
        heading: "Ce qu'il faut afficher sur chaque fiche produit WooCommerce",
        body: [
          "Pour chaque produit vendu à des consommateurs EU, votre fiche produit WooCommerce doit afficher ou rendre accessible :",
          "**Les coordonnées du fabricant ou de la Personne Responsable EU** : nom, adresse physique, email. Peut être affiché en bas de fiche produit ou dans une section « Informations légales ».",
          "**La référence ou numéro de modèle** : un identifiant permettant de tracer le produit.",
          "**Les avertissements de sécurité** : dans la langue du pays de livraison. Si votre boutique livre en France et en Allemagne, les avertissements doivent être disponibles en FR et en DE.",
          "**Les restrictions d'âge** (si applicable) : mention textuelle et/ou pictogramme.",
          "Un moyen simple d'implémenter cela : créez un champ personnalisé WooCommerce « Informations de sécurité » affiché en bas de chaque fiche produit, alimenté depuis votre dossier GPSR.",
        ],
      },
      {
        heading: "Intégrer Conforva dans votre workflow WooCommerce",
        body: [
          "Le plan Pro de Conforva inclut un connecteur WooCommerce qui permet d'importer automatiquement vos fiches produits WooCommerce pour pré-remplir les dossiers GPSR.",
          "Le workflow recommandé : exportez votre catalogue WooCommerce en CSV (WooCommerce → Produits → Exporter), importez dans Conforva, générez les dossiers techniques en masse, puis utilisez les labels et avertissements générés pour mettre à jour vos fiches produits.",
          "Pour les catalogues importants (50 références ou plus), cette approche permet de traiter l'ensemble du catalogue en une journée de travail plutôt qu'en plusieurs semaines.",
        ],
      },
      {
        heading: "Pages légales obligatoires pour une boutique WooCommerce vendant en EU",
        body: [
          "Au-delà de la conformité produit, votre boutique WooCommerce doit disposer de certaines pages légales pour être conforme au droit européen :",
          "**Mentions légales** : identification de l'exploitant (nom, adresse, numéro SIRET ou équivalent, email).",
          "**Politique de confidentialité (RGPD)** : comment vous traitez les données personnelles de vos clients.",
          "**CGV (Conditions Générales de Vente)** : droits du consommateur, délais de livraison, politique de retour (14 jours minimum en UE).",
          "**Politique de retour** : le droit de rétractation de 14 jours est obligatoire pour toute vente à distance en UE (directive 2011/83/UE).",
          "Ces pages ne font pas partie du GPSR à proprement parler, mais une boutique sans ces informations est doublement vulnérable en cas de contrôle.",
        ],
      },
    ],
    conclusion: "WooCommerce est une excellente plateforme pour vendre en Europe — mais sa flexibilité implique que vous gérez vous-même la conformité réglementaire. Personne ne vous suspendra pour non-conformité GPSR, mais les autorités peuvent vous contrôler à tout moment. La mise en conformité proactive — dossiers techniques, affichage correct des informations de sécurité, pages légales à jour — vous protège efficacement.",
    cta: {
      heading: "Importez votre catalogue WooCommerce dans Conforva",
      text: "Connectez WooCommerce à Conforva et générez les dossiers GPSR pour toutes vos références. Disponible sur le plan Pro.",
      button: "Démarrer avec WooCommerce",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-safety-gate-portail-signalement",
    title: "Safety Gate EU : obligations d'enregistrement et signalement pour e-commerçants",
    description: "Le portail Safety Gate EU (ex-RAPEX) est au cœur de la surveillance du marché GPSR. Découvrez qui doit s'enregistrer, comment signaler un produit dangereux et comment éviter d'y figurer.",
    keywords: ["Safety Gate EU", "RAPEX GPSR", "portail Safety Gate", "signalement produit dangereux EU", "enregistrement Safety Gate", "GPSR surveillance marché"],
    publishedAt: "2025-06-06",
    readingTime: 6,
    category: "Réglementation",
    intro: "Le Safety Gate est le portail de l'Union Européenne dédié aux alertes sur les produits de consommation dangereux. Remplaçant l'ancien système RAPEX, il joue un rôle central dans le GPSR. Voici ce que vous devez savoir en tant que vendeur : qui doit s'y enregistrer, comment l'utiliser, et comment éviter d'y apparaître.",
    sections: [
      {
        heading: "Qu'est-ce que le Safety Gate et à quoi sert-il ?",
        body: [
          "Le Safety Gate (anciennement RAPEX — Rapid Alert System for dangerous products) est le système d'alerte rapide de la Commission Européenne pour les produits de consommation non alimentaires dangereux.",
          "Quand une autorité nationale (la DGCCRF en France, le BSI en Allemagne, etc.) identifie un produit dangereux sur le marché EU, elle le signale au Safety Gate. L'information est immédiatement partagée avec toutes les autorités nationales des 31 pays du système, qui peuvent prendre des mesures correctives dans leurs propres marchés.",
          "Pour les vendeurs : si votre produit est signalé au Safety Gate, cela déclenche potentiellement des contrôles et rappels dans toute l'Europe. La base de données Safety Gate est publique — vos clients et partenaires peuvent y rechercher votre produit.",
        ],
      },
      {
        heading: "Qui doit s'enregistrer sur le portail Safety Gate Business ?",
        body: [
          "Le GPSR introduit une nouvelle obligation : le portail Safety Gate Business permet aux opérateurs économiques (fabricants, importateurs, distributeurs) et aux places de marché de signaler directement les produits dangereux.",
          "L'enregistrement sur le Safety Gate Business Portal est obligatoire pour les opérateurs économiques qui identifient un risque sérieux lié à l'un de leurs produits. Ce n'est pas un enregistrement préventif obligatoire pour tous — c'est un mécanisme de signalement à utiliser quand un problème est identifié.",
          "En pratique, si vous avez connaissance qu'un de vos produits présente un risque sérieux pour la sécurité des consommateurs, vous avez l'obligation légale de le signaler via ce portail. Ne pas le faire constitue une infraction supplémentaire au GPSR.",
        ],
      },
      {
        heading: "Quand et comment signaler un produit via Safety Gate",
        body: [
          "Votre obligation de signalement se déclenche dès que vous avez connaissance d'un « risque sérieux » lié à votre produit : blessures signalées par des clients, défaut de conception identifié, résultats de tests révélant une non-conformité à une norme de sécurité critique.",
          "La procédure : accédez au portail Safety Gate Business (safetygate.ec.europa.eu), créez un compte opérateur, soumettez une notification avec la description du produit, du risque identifié, et des mesures correctives prises (retrait, rappel, correction).",
          "Les délais sont courts : le GPSR recommande de notifier sans délai une fois le risque identifié. Les autorités nationales doivent être informées en parallèle.",
          "Conseil pratique : documentez systématiquement les plaintes clients concernant la sécurité. Si plusieurs clients signalent le même problème, c'est un signal d'alerte qui peut déclencher votre obligation de notification.",
        ],
      },
      {
        heading: "Comment éviter d'apparaître dans la base de données Safety Gate",
        body: [
          "Être référencé dans la base Safety Gate a des conséquences commerciales sérieuses : vos produits peuvent être bloqués dans plusieurs pays simultanément, votre réputation de vendeur est impactée, et les places de marché peuvent prendre des mesures automatiques.",
          "La prévention reste la seule stratégie efficace : constitution d'un dossier technique solide avant mise sur le marché, analyse de risque documentée identifiant les dangers potentiels, tests de conformité pour les catégories à risque.",
          "Un dossier technique conforme prouve que vous avez évalué sérieusement les risques avant la mise sur le marché. En cas d'incident, il démontre votre bonne foi et peut limiter significativement vos responsabilités.",
        ],
      },
    ],
    conclusion: "Le Safety Gate est à la fois un outil de protection des consommateurs et un mécanisme d'obligation pour les vendeurs. Connaître son fonctionnement permet de se préparer : signaler proactivement en cas de problème est toujours préférable à être signalé par une autorité nationale. Et la meilleure protection reste une documentation GPSR solide qui réduit le risque de défaillance produit à la source.",
    cta: {
      heading: "Protégez votre activité avec des dossiers GPSR conformes",
      text: "Un dossier technique solide est votre meilleure protection contre les alertes Safety Gate. Générez-le en quelques minutes avec Conforva.",
      button: "Créer mon dossier technique",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-bijoux-accessoires-conformite",
    title: "GPSR et bijoux : REACH, nickel, étiquetage — guide pour vendeurs en Europe",
    description: "Bijoux et accessoires de mode sont soumis au GPSR et à REACH (restriction nickel). Découvrez les obligations, les tests requis et comment vendre vos bijoux en conformité sur Amazon et Etsy EU.",
    keywords: ["GPSR bijoux", "restriction nickel bijoux UE", "REACH bijoux", "conformité bijoux Europe", "dossier technique bijoux", "vendre bijoux Amazon EU", "bijoux fantaisie conformité"],
    publishedAt: "2025-06-06",
    readingTime: 6,
    category: "Réglementation",
    intro: "Les bijoux et accessoires de mode — colliers, bracelets, boucles d'oreilles, bagues, barrettes — sont soumis au GPSR et à des restrictions chimiques strictes sous REACH. La restriction sur le nickel en particulier est fréquemment violée par des produits importés. Voici ce que vous devez savoir pour vendre vos bijoux légalement en Europe.",
    sections: [
      {
        heading: "La restriction nickel : l'obligation la plus souvent violée",
        body: [
          "Le règlement REACH (CE) 1907/2006, entrée XVII, interdit l'utilisation du nickel dans les bijoux et accessoires qui entrent en contact prolongé avec la peau si le taux de libération dépasse 0,5 μg/cm²/semaine pour les articles en contact avec la peau percée, et 0,5 μg/cm²/semaine pour les autres articles en contact cutané.",
          "Concrètement, presque tous les alliages métalliques contiennent du nickel. La question est si ce nickel se libère à un taux supérieur au seuil réglementaire. Des revêtements (galvanoplastie, dorure, argenture) permettent de réduire la libération de nickel — mais doivent être testés.",
          "Le test requis est la méthode EN 1811 (test de libération du nickel). Ce test doit être réalisé en laboratoire accrédité. Un test EN 1811 pour bijoux coûte généralement 80 à 150 € par référence.",
          "Attention : beaucoup de vendeurs sur Etsy et Amazon vendent des bijoux fantaisie importés de Chine sans avoir fait réaliser ce test. C'est une non-conformité fréquente qui expose à des rappels.",
        ],
      },
      {
        heading: "Autres substances REACH à vérifier dans les bijoux",
        body: [
          "Au-delà du nickel, d'autres substances REACH sont à surveiller dans les bijoux :",
          "**Chrome VI** : interdit dans les articles en cuir et similicuir (bracelets en cuir, ceintures, lanières) au-delà de 3 mg/kg. Test : EN ISO 17075.",
          "**Plomb et cadmium** : limités dans les bijoux sous le règlement REACH Annexe XVII (plomb : 0,05% en poids, cadmium : 0,01%). Tests par XRF screening ou ICP.",
          "**Phtalates (DEHP, BBP, DBP, DIBP)** : interdits dans les composants plastiques (revêtements, sertissages plastiques) au-delà de 0,1%.",
          "**Colorants azoïques** : applicables aux parties textiles ou en cuir des bijoux.",
          "Pour les bijoux destinés aux enfants de moins de 14 ans : les seuils sont plus stricts et les tests plus complets sont généralement requis.",
        ],
      },
      {
        heading: "Étiquetage des bijoux : ce qui doit figurer sur ou avec le produit",
        body: [
          "Les bijoux ne sont pas soumis à des exigences d'étiquetage aussi spécifiques que l'électronique ou les jouets. Cependant, le GPSR impose :",
          "**Identification du fabricant ou de la Personne Responsable EU** : nom ou raison sociale, adresse, email ou site web. Pour les bijoux vendus sur Etsy ou Amazon, ces informations peuvent figurer sur l'emballage ou la documentation.",
          "**Référence ou numéro de modèle** : permettant de tracer le produit.",
          "**Avertissements si applicable** : mention « Peut contenir des traces de nickel — peut provoquer des réactions allergiques chez les personnes sensibles » si votre bijou contient du nickel (même en dessous des seuils de restriction).",
          "Pour les bijoux vendus avec une certification (ex : « Sans nickel certifié » ou « Hypoallergénique »), vous devez pouvoir justifier cette allégation avec des résultats de tests.",
        ],
      },
      {
        heading: "Bijoux sur Amazon EU et Etsy : ce qu'exigent les plateformes",
        body: [
          "**Amazon EU** : la catégorie bijoux est régulièrement auditée. Amazon peut demander des rapports de tests EN 1811 (nickel) et les coordonnées de la Personne Responsable EU. Les annonces de bijoux pour enfants sont particulièrement surveillées.",
          "**Etsy** : Etsy peut vous demander de confirmer la conformité REACH de vos bijoux, surtout pour les catégories Bijoux pour enfants et Bijoux artisanaux.",
          "**Votre boutique Shopify/WooCommerce** : vous êtes directement responsable. La DGCCRF peut faire des achats tests sur vos bijoux et les soumettre à des tests EN 1811. Les résultats dépassant les seuils peuvent entraîner un rappel.",
          "Conseil : si vous importez des bijoux depuis la Chine ou l'Inde, insistez auprès de votre fournisseur pour obtenir des rapports de tests nickel EN 1811 récents (moins de 2 ans). C'est un document que les bons fournisseurs de bijoux ont systématiquement.",
        ],
      },
    ],
    conclusion: "La conformité des bijoux en Europe se joue essentiellement sur la restriction nickel REACH et les autres restrictions chimiques. Les tests sont abordables (80 à 150 € par référence pour un test nickel) et constituent votre principale protection. Associés à un dossier technique GPSR, ils vous permettent de vendre en toute sérénité sur tous les marchés européens.",
    cta: {
      heading: "Documentez vos bijoux avec Conforva",
      text: "Générez le dossier technique GPSR pour vos bijoux et accessoires — analyse de risque REACH, étiquettes multilingues et déclaration de conformité.",
      button: "Créer mon dossier bijoux",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-produits-puericulture-bebes",
    title: "GPSR et puériculture : les obligations renforcées pour les produits bébés",
    description: "Poussettes, sièges auto, hochets, trotteurs — les produits de puériculture ont les exigences GPSR les plus strictes. Découvrez les normes obligatoires et comment mettre vos produits bébé en conformité.",
    keywords: ["GPSR puériculture", "conformité produits bébé EU", "normes sécurité bébé Europe", "siège auto conformité", "jouets bébé GPSR", "dossier technique puériculture"],
    publishedAt: "2025-06-06",
    readingTime: 7,
    category: "Réglementation",
    intro: "Les produits destinés aux nourrissons et aux jeunes enfants (moins de 3 ans) sont la catégorie la plus strictement encadrée en Europe. Le GPSR, combiné aux normes de sécurité spécifiques à la puériculture, impose des exigences très élevées. Si vous vendez des produits bébé sur Amazon EU, Shopify ou Etsy, voici ce que vous ne pouvez pas ignorer.",
    sections: [
      {
        heading: "Pourquoi les produits bébé ont des exigences renforcées",
        body: [
          "Le GPSR reconnaît que les nourrissons et les jeunes enfants sont une population vulnérable particulière : ils ne peuvent pas lire les avertissements, ils mettent les objets en bouche, et leurs voies respiratoires sont étroites (risque d'étouffement accru).",
          "Pour les produits conçus pour ou susceptibles d'être utilisés par des enfants de moins de 3 ans, le GPSR impose une analyse de risque renforcée, des marges de sécurité plus strictes, et des tests obligatoires dans la plupart des cas.",
          "Les autorités de surveillance (DGCCRF, BSI) font des campagnes de contrôle régulières sur les produits de puériculture, incluant des achats tests sur les boutiques en ligne. C'est l'une des catégories avec le taux de non-conformité le plus élevé détecté dans le Safety Gate.",
        ],
      },
      {
        heading: "Les normes harmonisées clés pour la puériculture",
        body: [
          "**EN 71 (jouets)** : pour les jouets d'éveil et les hochets destinés aux bébés. Les parties 1 (propriétés mécaniques), 2 (inflammabilité) et 3 (migration chimique) sont systématiquement applicables.",
          "**EN 12227 (parcs bébé)** : stabililité, espaces entre barreaux, résistance mécanique.",
          "**EN 1888 (poussettes)** : stabilité, freins, harnais de sécurité, résistance à la compression.",
          "**EN 13209 (porte-bébés)** : résistance des sangles, positionnement ergonomique, sécurité des boucles.",
          "**EN 14988 (chaises hautes)** : stabilité, harnais, résistance aux chocs.",
          "**EN 71-3 (migration chimique)** : particulièrement importante pour tous les articles mis en bouche — anneaux de dentition, hochets, jouets d'éveil.",
          "**Restriction REACH sur phtalates** : seuils stricts (0,1%) pour tous les articles en plastique souple destinés aux enfants de moins de 3 ans.",
        ],
      },
      {
        heading: "Les petites pièces et le risque d'étouffement",
        body: [
          "Le risque d'étouffement est le principal danger des produits pour jeunes enfants. Toute pièce ou partie d'un produit qui peut être détachée et avalée par un enfant de moins de 3 ans représente un risque inacceptable.",
          "Le test de référence est le cylindre EN 71 (« petit objet ») : tout objet qui entre dans le cylindre de test (31,7 mm × 57,1 mm) est considéré comme une petite pièce dangereuse pour les enfants de moins de 3 ans.",
          "Concrètement : boutons, ocelles, petits ornements décoratifs, piles bouton, capuchons de stylo, petites vis — tous doivent être vérifiés. Pour les jouets pour enfants de moins de 3 ans, aucune pièce ne doit être accessible ou se détacher facilement.",
          "Ce test est généralement réalisé en laboratoire dans le cadre d'un test EN 71-1 complet. C'est une des vérifications les plus critiques en puériculture.",
        ],
      },
      {
        heading: "Amazon et les produits bébé : les exigences spécifiques",
        body: [
          "Amazon EU est particulièrement strict sur la catégorie Bébé & Puériculture. Créer un ASIN dans cette catégorie peut nécessiter de soumettre la documentation directement lors de la mise en vente :",
          "Rapports de tests selon les normes harmonisées applicables (EN 71, EN 1888, etc.), réalisés par un laboratoire accrédité ISO 17025.",
          "Déclaration de conformité CE signée.",
          "Coordonnées de la Personne Responsable EU dans Seller Central.",
          "Photos du marquage CE et des avertissements d'âge sur l'emballage.",
          "Sans cette documentation, Amazon peut refuser la mise en vente dès la création de l'ASIN — pas seulement suspendre l'annonce après coup.",
          "Conseil : préparez TOUTE la documentation avant de commencer à lister sur Amazon. La soumission a posteriori est plus longue et risquée.",
        ],
      },
    ],
    conclusion: "Les produits de puériculture sont la catégorie qui justifie le plus clairement pourquoi le GPSR existe. Un produit bébé non conforme peut blesser un nourrisson sans défense. Les exigences élevées ne sont pas de la bureaucratie — elles sauvent des vies. Pour les vendeurs : la conformité dans cette catégorie est non négociable et doit être documentée avant toute mise en vente.",
    cta: {
      heading: "Générez votre dossier technique puériculture",
      text: "Conforva génère le dossier technique GPSR pour vos produits bébé et puériculture, avec l'analyse de risque renforcée pour les populations vulnérables.",
      button: "Créer mon dossier puériculture",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-checklist-mise-en-conformite",
    title: "GPSR checklist : les 10 étapes pour mettre un produit en conformité en 2025",
    description: "La checklist GPSR complète pour e-commerçants : dossier technique, analyse de risque, déclaration de conformité, Personne Responsable EU, étiquetage — les 10 étapes dans le bon ordre.",
    keywords: ["checklist GPSR", "étapes conformité GPSR", "comment se conformer GPSR", "GPSR guide pratique étapes", "mise en conformité GPSR rapide", "GPSR par où commencer"],
    publishedAt: "2025-06-06",
    readingTime: 5,
    category: "Documentation",
    intro: "Le GPSR impose plusieurs obligations simultanées. Par où commencer ? Dans quel ordre procéder ? Voici les 10 étapes dans le bon ordre pour mettre un produit en conformité GPSR, que vous soyez fabricant, importateur ou distributeur.",
    sections: [
      {
        heading: "Étapes 1 à 3 : préparer les bases",
        body: [
          "**Étape 1 — Identifier votre rôle dans la chaîne** : fabricant (vous créez ou faites créer sous votre marque), importateur (vous achetez hors UE et vendez en EU), ou distributeur (vous revendez ce que d'autres ont mis sur le marché). Votre rôle détermine l'étendue de vos obligations.",
          "**Étape 2 — Identifier les réglementations applicables** : GPSR s'applique toujours. Ensuite, selon la catégorie : directive jouets (2009/48/CE), LVD + CEM + RED (électronique), règlement cosmétiques (1223/2009), REACH, RoHS, CLP... Un outil comme Conforva peut automatiquement identifier les normes applicables selon la catégorie de votre produit.",
          "**Étape 3 — Identifier les marchés cibles** : chaque marché a ses exigences spécifiques. EU (GPSR + directives sectorielles), UK (UKCA), US (CPSC), CN (GB standards), JP (PSE), AU (RCM). Pour démarrer, concentrez-vous sur l'EU et ajoutez les autres marchés progressivement.",
        ],
      },
      {
        heading: "Étapes 4 à 6 : construire la documentation",
        body: [
          "**Étape 4 — Réaliser l'analyse de risque ISO 12100** : identifiez systématiquement tous les dangers (mécanique, chimique, électrique, thermique, biologique), évaluez probabilité × gravité pour chaque danger, définissez les mesures de mitigation. C'est le cœur du dossier technique.",
          "**Étape 5 — Constituer le dossier technique (15 sections, Art. 22)** : description produit, BOM (nomenclature), dessins techniques, normes applicables, analyse de risque, résultats de tests, usage prévu, population cible, instructions, étiquetage, PR EU, traçabilité, marchés tiers, historique versions, déclaration de conformité.",
          "**Étape 6 — Rédiger la déclaration UE de conformité (Art. 24)** : document signé par le fabricant ou son représentant légal EU, listant toutes les réglementations et normes auxquelles le produit est déclaré conforme. À conserver 10 ans.",
        ],
      },
      {
        heading: "Étapes 7 à 10 : finaliser et mettre sur le marché",
        body: [
          "**Étape 7 — Préparer l'étiquetage multilingue** : avertissements de sécurité dans la langue de chaque pays de vente, pictogrammes CLP si applicable, coordonnées du fabricant ou de la Personne Responsable EU, numéro de référence ou de lot.",
          "**Étape 8 — Désigner la Personne Responsable EU (si hors UE)** : formaliser par contrat, documenter les coordonnées, s'assurer que ces coordonnées figurent sur le produit ou l'emballage et dans Seller Central si vente Amazon.",
          "**Étape 9 — Archiver et organiser la documentation** : conservez tous les documents dans un système organisé (numérique recommandé). Minimum 10 ans à partir de la dernière mise sur le marché. Créez un index par référence produit.",
          "**Étape 10 — Mettre à jour quand nécessaire** : votre dossier n'est pas figé. Mise à jour obligatoire si modification du produit, si une norme harmonisée est révisée, ou si vous lancez sur un nouveau marché. Versionner (v1.0, v1.1, etc.) et documenter chaque révision.",
        ],
      },
    ],
    conclusion: "La conformité GPSR n'est pas un projet unique — c'est un processus continu. Une fois le premier dossier constitué, chaque nouveau produit va plus vite. Et l'archivage systématique vous protège durablement contre les contrôles et les litiges. L'important est de commencer : un dossier imparfait aujourd'hui vaut infiniment mieux qu'un dossier parfait dans 6 mois.",
    cta: {
      heading: "Suivez la checklist avec Conforva",
      text: "Conforva guide chaque étape de la mise en conformité GPSR et génère automatiquement les documents requis. Gratuit pour votre première référence.",
      button: "Commencer ma checklist GPSR",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-veille-reglementaire-normes",
    title: "Veille réglementaire GPSR : comment suivre les évolutions des normes et réglementations",
    description: "Les normes harmonisées GPSR évoluent régulièrement. Comment surveiller les changements qui impactent vos produits ? Outils, sources officielles et stratégie de veille pour e-commerçants.",
    keywords: ["veille réglementaire GPSR", "normes harmonisées évolution", "mise à jour normes GPSR", "EUR-Lex veille", "Journal Officiel UE normes", "GPSR normes 2025 mises à jour"],
    publishedAt: "2025-06-06",
    readingTime: 6,
    category: "Documentation",
    intro: "Le GPSR impose que votre dossier technique reste à jour. Or les normes harmonisées — EN 71, EN 62368, EN 15494 et des centaines d'autres — sont régulièrement révisées. Une norme mise à jour peut rendre obsolète votre dossier technique existant. Voici comment mettre en place une veille réglementaire efficace sans y consacrer des heures chaque semaine.",
    sections: [
      {
        heading: "Pourquoi la veille réglementaire est obligatoire",
        body: [
          "Le GPSR impose que les opérateurs économiques s'assurent que leurs produits restent conformes tout au long de leur commercialisation. Cela inclut la conformité aux normes harmonisées en vigueur — pas seulement celles qui existaient au moment de la première mise sur le marché.",
          "Quand une norme harmonisée est révisée (par exemple EN 71-1:2024 remplace EN 71-1:2014), les produits qui ne respectent plus la nouvelle version ne peuvent plus bénéficier de la présomption de conformité. Votre dossier technique doit être mis à jour.",
          "Les délais de transition sont définis dans le Journal Officiel de l'UE : une norme révisée est d'abord publiée, puis une période de coexistence est accordée (généralement 12 à 36 mois), avant que l'ancienne norme ne soit retirée. Surveiller ces publications vous permet d'anticiper.",
        ],
      },
      {
        heading: "Les sources officielles à surveiller",
        body: [
          "**EUR-Lex (eur-lex.europa.eu)** : le portail du droit de l'UE. Abonnez-vous aux alertes pour les actes législatifs pertinents. Cherchez « GPSR » ou « règlement (UE) 2023/988 » pour suivre les actes délégués et les normes harmonisées publiées.",
          "**Journal Officiel de l'UE (séries C et L)** : les listes des normes harmonisées sont publiées régulièrement en série C. Une notification automatique est disponible sur EUR-Lex.",
          "**CENELEC / CEN (cen.eu et cenelec.eu)** : les organismes européens de normalisation publient les projets de normes et les nouvelles publications. Un abonnement aux newsletters sectorielles permet de suivre les révisions en cours.",
          "**Safety Gate (safetygate.ec.europa.eu)** : surveiller les alertes sur votre catégorie de produits vous signale les problèmes de conformité identifiés par les autorités — souvent un signal que des normes vont évoluer.",
        ],
      },
      {
        heading: "Comment organiser sa veille en pratique",
        body: [
          "**Approche minimaliste** : abonnez-vous aux alertes EUR-Lex pour les normes harmonisées de votre secteur. Vérifiez une fois par trimestre si des mises à jour ont été publiées pour les normes citées dans votre dossier technique.",
          "**Approche structurée** : créez un tableau de suivi de vos normes (norme, version actuelle, date de révision annoncée, date de retrait de l'ancienne version). Mettez-le à jour trimestriellement.",
          "**Approche automatisée** : des outils comme Conforva (plan Growth+) intègrent une veille réglementaire qui vous alerte automatiquement quand une norme applicable à votre catégorie de produits est mise à jour.",
          "Conseil pratique : quand vous recevez une alerte de mise à jour de norme, évaluez d'abord si le changement impacte réellement votre produit. Beaucoup de révisions de normes sont mineures et n'impactent pas les produits déjà conformes.",
        ],
      },
      {
        heading: "Quand faut-il impérativement mettre à jour son dossier technique ?",
        body: [
          "**Révision majeure d'une norme harmonisée** : quand la norme que vous avez citée dans votre déclaration de conformité est révisée et que la transition est obligatoire.",
          "**Modification du produit** : tout changement de matériaux, de conception, de fournisseur de composants critiques, ou d'emballage nécessite une révision du dossier technique.",
          "**Nouveau marché** : si vous lancez votre produit sur un nouveau marché (UK, US, JP...), le dossier doit être complété avec les exigences de ce marché.",
          "**Alerte Safety Gate sur un produit similaire** : si un concurrent voit son produit similaire au vôtre signalé dans le Safety Gate, c'est un signal fort que vous devez vérifier la conformité du vôtre.",
          "**Nouvelle réglementation** : introduction d'une nouvelle directive ou d'un acte délégué GPSR applicable à votre catégorie.",
        ],
      },
    ],
    conclusion: "La veille réglementaire n'est pas une option pour un e-commerçant sérieux — c'est une obligation implicite du GPSR. La bonne nouvelle : avec les bons outils et les bonnes sources, une veille efficace ne prend que quelques heures par trimestre. Automatiser ce que vous pouvez automatiser et concentrez votre attention humaine sur les changements qui ont un impact réel sur vos produits.",
    cta: {
      heading: "Activez la veille réglementaire automatique",
      text: "Conforva surveille les normes applicables à vos produits et vous alerte automatiquement des mises à jour réglementaires. Disponible sur les plans Growth et Pro.",
      button: "Activer la veille réglementaire",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-declaration-conformite-modele-gratuit",
    title: "Modèle de déclaration de conformité GPSR : téléchargement et guide de rédaction",
    description: "Comment rédiger une déclaration de conformité GPSR conforme à l'Article 24 ? Structure obligatoire, contenu requis et guide pratique pour créer votre DoC sans erreur.",
    keywords: ["modèle déclaration conformité GPSR", "télécharger déclaration conformité", "template DoC GPSR", "rédiger DoC Article 24", "déclaration conformité GPSR gratuit", "exemple déclaration conformité UE"],
    publishedAt: "2025-06-06",
    readingTime: 5,
    category: "Documentation",
    intro: "La déclaration de conformité est l'un des documents les plus recherchés par les e-commerçants qui découvrent le GPSR. Quel format ? Quel contenu exact ? Qui peut la signer ? Voici un guide complet et la structure que vous pouvez utiliser comme modèle.",
    sections: [
      {
        heading: "La structure obligatoire selon l'Article 24 GPSR",
        body: [
          "L'Article 24 du GPSR (UE) 2023/988 définit le contenu minimum de la déclaration UE de conformité. Voici la structure à respecter :",
          "**1. Numéro de la déclaration** : un identifiant unique pour versionner et archiver (ex : DoC-2025-001).",
          "**2. Identification du produit** : nom commercial, référence, numéro de modèle, description succincte du produit et de son usage prévu.",
          "**3. Identification du fabricant** : raison sociale complète, adresse physique, pays. Si hors UE : ajouter les coordonnées complètes de la Personne Responsable EU.",
          "**4. Déclaration de conformité** : mention explicite que « le produit décrit ci-dessus est conforme aux exigences essentielles » de chaque réglementation applicable.",
          "**5. Réglementations applicables** : liste complète des règlements EU et directives dont la conformité est déclarée (ex : Règlement (UE) 2023/988 — GPSR, Directive 2009/48/CE — jouets, etc.).",
          "**6. Normes harmonisées appliquées** : références exactes des normes (ex : EN 15494:2019, EN 71-1:2014+A1:2018).",
          "**7. Date de délivrance** : date de signature de la déclaration.",
          "**8. Signature** : nom, titre et signature manuscrite ou électronique qualifiée du signataire autorisé.",
        ],
      },
      {
        heading: "Exemple de déclaration de conformité pour une bougie",
        body: [
          "Voici un exemple de contenu pour une déclaration de conformité d'une bougie parfumée :",
          "**Déclaration UE de Conformité n° DoC-2025-001**",
          "**Produit** : Bougie parfumée en cire de soja — Référence : BGIE-SJV-001 — Description : bougie parfumée contenant 200g de cire de soja végétale et 8% de fragrance synthétique, conditionnée en verre cylindrique de 8cm de diamètre.",
          "**Fabricant** : [Votre raison sociale], [Adresse complète], [Pays]. Email : [email]. Téléphone : [téléphone].",
          "**Déclaration** : Le produit décrit ci-dessus est conforme aux exigences essentielles et autres dispositions applicables des réglementations suivantes :",
          "— Règlement (UE) 2023/988 relatif à la sécurité générale des produits (GPSR)",
          "— Règlement (CE) 1272/2008 relatif à la classification, à l'étiquetage et à l'emballage des mélanges dangereux (CLP)",
          "**Normes harmonisées appliquées** : EN 15494:2019 (Bougies — Exigences de sécurité et d'information), EN 15493:2007 (Bougies — Spécifications de sécurité incendie).",
          "**Lieu et date** : [Ville], le [date]. **Signataire** : [Nom et prénom], [Titre/Fonction]. [Signature].",
        ],
      },
      {
        heading: "Erreurs fréquentes dans les déclarations de conformité",
        body: [
          "**Déclarer CE sans directive applicable** : le marquage CE n'existe que pour les produits soumis à une directive sectorielle. Pour un produit couvert uniquement par le GPSR (sans directive sectorielle), il n'y a pas de CE — mais la déclaration de conformité GPSR reste obligatoire.",
          "**Citer des normes sans les avoir appliquées** : citer EN 71 dans votre DoC sans avoir réalisé les tests EN 71 constitue une fausse déclaration. Ne citez que les normes que vous pouvez justifier avoir respectées.",
          "**Oublier la Personne Responsable EU** : pour les fabricants hors UE, la DoC doit mentionner les coordonnées de la PR EU.",
          "**Pas de numéro de version** : sans versioning, impossible de savoir si votre DoC est à jour quand une norme est révisée.",
          "**Signature par quelqu'un sans autorité** : la DoC doit être signée par quelqu'un habilité à engager la société. Un prestataire logistique ne peut pas signer votre DoC à votre place.",
        ],
      },
    ],
    conclusion: "La déclaration de conformité est un document officiel qui engage votre responsabilité. Elle doit être rédigée avec soin, correspondre exactement à ce que votre dossier technique documente, et être mise à jour dès qu'une norme ou une réglementation change. Un modèle bien structuré, rempli avec les vraies données de votre produit, vous protège légalement et rassure vos partenaires commerciaux.",
    cta: {
      heading: "Générez votre déclaration de conformité automatiquement",
      text: "Conforva pré-remplit votre déclaration UE de conformité à partir de vos données produit. Prête à signer en quelques minutes.",
      button: "Générer ma déclaration",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-petites-entreprises-auto-entrepreneurs",
    title: "GPSR pour les petites entreprises et auto-entrepreneurs : obligations concrètes et coûts réels",
    description: "Vous êtes TPE, micro-entreprise ou auto-entrepreneur et vous vendez des produits en Europe ? Voici exactement ce que le GPSR vous impose — et comment rester conforme sans vous ruiner.",
    keywords: ["GPSR petite entreprise", "GPSR auto-entrepreneur", "GPSR TPE PME", "conformité GPSR micro-entreprise", "obligations GPSR indépendant"],
    publishedAt: "2025-06-01",
    readingTime: 7,
    category: "Réglementation",
    intro: "Le GPSR ne fait pas de distinction entre une multinationale et un auto-entrepreneur qui vend des produits faits maison sur Etsy. Si vous mettez un produit sur le marché européen, les obligations s'appliquent. Mais en pratique, leur mise en œuvre peut être adaptée à la taille de votre activité. Voici ce que le règlement impose réellement aux petites structures — et comment s'y conformer sans y passer des semaines.",
    sections: [
      {
        heading: "Le GPSR s'applique-t-il vraiment aux petites entreprises ?",
        body: [
          "Oui, sans exception de taille. Le règlement (UE) 2023/988 s'applique à « toute personne physique ou morale » qui met des produits de consommation sur le marché européen. Que vous soyez une SA de 500 employés ou un auto-entrepreneur qui vend des savons artisanaux, les obligations de base sont identiques.",
          "La réalité pratique, cependant, est plus nuancée. L'Article 22 du GPSR précise que le dossier technique doit être « proportionné à la nature du produit et aux risques qu'il présente ». Un savon artisanal sans pièce mécanique mobile n'a pas la même complexité documentaire qu'un appareil électronique. La proportionnalité est votre alliée.",
          "Mais attention : « proportionné » ne signifie pas « inexistant ». Même pour les produits les plus simples, vous devez pouvoir justifier que vous avez analysé les risques et que votre produit est sûr. Un simple fichier Word structuré vaut mieux que rien.",
        ],
      },
      {
        heading: "Ce que vous devez faire concrètement en tant que petite structure",
        body: [
          "**Dossier technique (obligatoire, Article 22)** : documentez votre produit — description, matériaux, usage prévu, avertissements. Identifiez les risques potentiels et expliquez comment vous les avez éliminés ou réduits. Pour une bougie : risque de brûlure (traité par étiquetage), risque incendie (traité par la sécurité de la mèche), etc. Ce document n'a pas besoin d'être en anglais ni dans un format particulier — mais il doit exister.",
          "**Informations produit (Article 9)** : le nom ou la marque du fabricant et une adresse de contact doivent apparaître sur le produit ou son emballage. Pour un auto-entrepreneur, votre nom commercial et votre email professionnel suffisent. Si vous vendez dans plusieurs pays, les avertissements de sécurité doivent être traduits dans chaque langue.",
          "**Personne Responsable EU (Article 16)** : si vous êtes établi dans l'UE, c'est vous. Si vous êtes hors UE (ex : vous habitez en Suisse ou au Maroc et vendez sur Amazon.fr), vous devez désigner un représentant établi dans l'UE.",
          "**Déclaration de conformité (Article 24)** : un document attestant que votre produit respecte le GPSR. Pour une petite structure, c'est un document d'une page avec vos coordonnées, la description du produit, et votre signature. Il n'est pas à envoyer à une autorité — vous le gardez et le fournissez sur demande.",
        ],
      },
      {
        heading: "Combien ça coûte vraiment pour une TPE ?",
        body: [
          "Le vrai frein pour les petites structures, c'est le temps et le coût perçu. Voici une estimation réaliste :",
          "**Option 1 — Tout faire soi-même** : 1 à 3 jours de travail par référence pour comprendre les exigences, rédiger les documents, et vérifier la conformité. Gratuit en argent, coûteux en temps. Risque d'erreurs si vous n'êtes pas familier avec les normes applicables.",
          "**Option 2 — Cabinet conseil spécialisé** : 300 à 1 500 € par référence selon la complexité du produit. Adapté si vous avez peu de références et un produit à fort enjeu (jouets, électronique, cosmétiques). Trop coûteux pour un catalogue de 20 produits à 15 € pièce.",
          "**Option 3 — Outil logiciel spécialisé** : 30 à 80 € par mois pour un abonnement qui génère automatiquement dossier technique, analyse de risque et déclaration de conformité. Pour 5 à 50 références, c'est souvent l'option la plus rentable. Conforva, par exemple, permet de générer un dossier complet en moins de 10 minutes.",
          "**Ce qui n'est pas négociable** : les tests de laboratoire, si votre produit entre dans une catégorie réglementée (jouets, cosmétiques, appareils électriques). Ces tests ont un coût fixe (200 à 2 000 € selon le produit) que ni un outil logiciel ni un consultant ne peut supprimer.",
        ],
      },
      {
        heading: "Les erreurs les plus courantes chez les petits vendeurs",
        body: [
          "**« Je suis trop petit pour être contrôlé »** : c'est faux. Les contrôles de la DGCCRF ciblent régulièrement les petits vendeurs en ligne, notamment sur les marchés de niche comme les bougies artisanales, les bijoux faits main et les cosmétiques naturels.",
          "**« Le fournisseur m'a envoyé un certificat, c'est suffisant »** : non. Si vous importez depuis la Chine ou hors UE et mettez le produit à votre nom, vous êtes considéré comme fabricant au sens du GPSR. Le certificat de votre fournisseur ne vous couvre pas — vous devez établir votre propre dossier.",
          "**« J'ai mis 'fabriqué artisanalement' donc les règles ne s'appliquent pas »** : le GPSR s'applique à tous les produits, artisanaux ou industriels. L'artisanat bénéficie parfois de normes plus légères, mais pas d'une exemption totale.",
          "**« Ma boutique Etsy est dans l'UE donc je suis couvert »** : Etsy (ou Amazon, ou Shopify) est une place de marché, pas votre représentant légal. La responsabilité de la conformité reste entièrement la vôtre.",
        ],
      },
      {
        heading: "Par où commencer si vous n'avez rien fait encore",
        body: [
          "Commencez par faire l'inventaire de vos produits et les regrouper par famille de risque. Un produit textile a des risques différents d'un produit alimentaire ou chimique. Identifiez vos 3 à 5 produits les plus vendus ou les plus risqués, et attaquez par ceux-là.",
          "Pour chaque produit, renseignez-vous sur les normes harmonisées applicables. Par exemple : EN 15494 pour les bougies, EN 71 pour les jouets, EN 50604 pour les batteries. L'AFNOR publie des guides sectoriels accessibles en ligne.",
          "Si vous vendez sur Amazon EU, vérifiez d'abord ce qu'Amazon vous demande dans le tableau de bord Seller Central — c'est souvent le déclencheur le plus immédiat. Amazon a commencé à suspendre des ASINs sans personne responsable EU et sans documentation GPSR dès fin 2024.",
        ],
      },
    ],
    conclusion: "Le GPSR n'est pas fait pour tuer les petites entreprises — il est fait pour protéger les consommateurs. En tant que TPE ou auto-entrepreneur, vous avez les mêmes obligations qu'un grand groupe, mais des ressources différentes. L'approche pragmatique : commencez par vos produits les plus vendus, constituez des dossiers proportionnés à la réalité de vos produits, et utilisez les outils disponibles pour automatiser ce qui peut l'être. La conformité n'est pas un luxe réservé aux grands — c'est une assurance contre les risques qui pèseraient encore plus lourd pour une petite structure.",
    cta: {
      heading: "Dossier technique GPSR complet en 10 minutes",
      text: "Conforva génère automatiquement votre dossier technique, analyse de risque et déclaration de conformité. Adapté aux petites structures.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-produits-faits-main-artisanat-checklist",
    title: "Checklist de conformité GPSR pour les produits faits main et l'artisanat (2025)",
    description: "Bijoux artisanaux, bougies, savons, textiles faits main : le GPSR s'applique à vous aussi. Voici la checklist complète pour savoir exactement où vous en êtes et ce qu'il vous manque.",
    keywords: ["GPSR artisanat", "conformité produits faits main", "GPSR créateurs", "GPSR bijoux artisanaux", "GPSR savons faits main", "GPSR bougies artisanales"],
    publishedAt: "2025-06-02",
    readingTime: 6,
    category: "Artisanat",
    intro: "Vous créez des produits à la main — bijoux, bougies, savons, céramiques, textiles, jouets en bois — et vous les vendez en ligne ou sur des marchés. Depuis décembre 2024, le GPSR (règlement UE 2023/988) s'applique pleinement à votre activité. Cette checklist vous permet de faire le point sur votre situation en moins de 10 minutes.",
    sections: [
      {
        heading: "Checklist 1 : Vos obligations de base (tous les créateurs)",
        body: [
          "Pour chaque produit que vous vendez à des consommateurs dans l'UE, vérifiez ces points :",
          "☐ **Identification du fabricant** : votre nom (ou raison sociale) et une adresse de contact physique ou email figurent-ils sur le produit ou l'emballage ? (Article 9 GPSR — obligatoire)",
          "☐ **Langue des avertissements** : si votre produit nécessite des instructions ou avertissements de sécurité, sont-ils dans la langue du pays où vous vendez ? (Pour les ventes en France : français obligatoire)",
          "☐ **Dossier technique existant** : avez-vous un document qui décrit votre produit, ses matériaux, son usage prévu, et les risques que vous avez identifiés ? (Article 22 GPSR — obligatoire)",
          "☐ **Traçabilité des matériaux** : pouvez-vous indiquer d'où proviennent vos matières premières ? (Important en cas de contrôle — si votre fournisseur de cire est mis en cause, vous devez pouvoir le tracer)",
          "☐ **Informations de sécurité sur la fiche produit en ligne** : vos photos et descriptions en ligne incluent-elles les avertissements de sécurité pertinents ?",
        ],
      },
      {
        heading: "Checklist 2 : Selon votre catégorie de produit",
        body: [
          "**Bougies artisanales** :",
          "☐ Étiquetage conforme EN 15494 (avertissements : ne jamais laisser sans surveillance, tenir hors de portée des enfants, etc.)",
          "☐ Fragrance testée IFRA (si vous utilisez des huiles essentielles ou fragrances de synthèse)",
          "☐ Récipient stable et résistant à la chaleur",
          "☐ Mèche auto-extinguible ou adaptée au diamètre",
          "**Savons et cosmétiques faits main** :",
          "☐ Déclaration de conformité cosmétique (règlement CE 1223/2009 — distinct du GPSR mais complémentaire)",
          "☐ Liste des ingrédients (INCI) sur l'emballage",
          "☐ Numéro de dossier sur le portail CPNP (Cosmetic Products Notification Portal)",
          "☐ Personne Responsable désignée (au sens du règlement cosmétique)",
          "**Bijoux et accessoires** :",
          "☐ Vérification des métaux : absence de nickel en concentration supérieure aux limites EN 1811",
          "☐ Accessoires pour enfants : conformité aux exigences de sécurité spécifiques (pas de petites pièces, etc.)",
          "**Jouets en bois et jouets faits main** :",
          "☐ Conformité directive jouets 2009/48/CE (les jouets ont leur propre réglementation en plus du GPSR)",
          "☐ Peintures et finitions conformes EN 71-3 (migration des éléments chimiques)",
          "☐ Pas de petites pièces pour enfants < 3 ans (EN 71-1)",
          "**Textiles et vêtements** :",
          "☐ Composition des fibres indiquée (règlement UE 1007/2011)",
          "☐ Instructions d'entretien (pictogrammes ISO 3758)",
          "☐ Colorants sans amines aromatiques interdites (REACH)",
        ],
      },
      {
        heading: "Checklist 3 : Si vous vendez sur des plateformes (Etsy, Amazon, Vinted)",
        body: [
          "☐ **Etsy** : Etsy vous demande depuis 2024 de confirmer votre conformité GPSR pour les produits vendus à des acheteurs EU. Avez-vous rempli les informations dans les paramètres de votre boutique ?",
          "☐ **Amazon** : avez-vous désigné une Personne Responsable EU dans Seller Central ? (Sans cela, vos ASINs peuvent être suspendus)",
          "☐ **Votre propre site** : les mentions légales incluent-elles vos coordonnées complètes en tant que fabricant ?",
          "☐ **Dans tous les cas** : vos CGV mentionnent-elles la conformité de vos produits et vos conditions de retour ?",
        ],
      },
      {
        heading: "Ce que vous n'êtes pas obligé de faire (contrairement aux idées reçues)",
        body: [
          "**Faire appel à un laboratoire de tests** : les tests en laboratoire ne sont obligatoires que pour certaines catégories (jouets, cosmétiques, appareils électriques). Pour une bougie, une céramique décorative ou un bijou pour adultes, ils ne sont pas imposés — mais fortement recommandés si vous avez des doutes sur vos matériaux.",
          "**Obtenir le marquage CE** : le CE n'existe que pour les produits soumis à une directive sectorielle spécifique (jouets, appareils électriques, dispositifs médicaux, etc.). Un savon artisanal ou une bougie n'a pas de marquage CE — c'est normal.",
          "**Envoyer vos documents à une autorité** : le dossier technique et la déclaration de conformité ne sont pas à déposer proactivement. Vous les conservez et les fournissez sur demande d'un inspecteur.",
          "**Traduire tous vos documents en anglais** : vos documents internes peuvent être dans votre langue. Seuls les éléments destinés aux consommateurs (avertissements, instructions) doivent être dans la langue du pays de vente.",
        ],
      },
      {
        heading: "Comment constituer votre dossier technique artisanal",
        body: [
          "Un dossier technique pour un produit artisanal ne doit pas nécessairement être un document de 50 pages. Pour un produit simple, voici ce qui suffit :",
          "**Section 1 — Description du produit** : nom, référence, dimensions, poids, matériaux utilisés (avec leur origine si possible), usage prévu, usages prévisibles mais non prévus (ex : les enfants peuvent toucher une bougie pour adultes).",
          "**Section 2 — Analyse des risques** : listez les dangers potentiels (brûlure, coupure, ingestion, allergie, etc.), évaluez pour chacun la probabilité et la gravité, et documentez ce que vous avez fait pour réduire chaque risque.",
          "**Section 3 — Mesures de mise en conformité** : normes que vous avez appliquées, tests que vous avez réalisés (même artisanaux : test de résistance, test de mèche pour une bougie, etc.), étiquetage mis en place.",
          "**Section 4 — Déclaration de conformité** : une page avec vos coordonnées, la description du produit, et votre engagement que le produit est conforme au GPSR. Datée et signée.",
          "Ce dossier peut être un fichier PDF d'une dizaine de pages. L'essentiel est qu'il soit sincère, daté, et que vous puissiez le présenter en cas de contrôle.",
        ],
      },
    ],
    conclusion: "Le GPSR n'est pas là pour mettre fin à l'artisanat — il est là pour garantir que les produits vendus aux consommateurs européens sont sûrs. En tant que créateur, vous connaissez vos produits mieux que quiconque : vous savez quels matériaux vous utilisez, quels risques vous avez anticipés, comment vous avez fabriqué. Documentez ce savoir de façon structurée, et votre conformité est à portée de main.",
    cta: {
      heading: "Générez votre dossier technique artisanal automatiquement",
      text: "Conforva guide les créateurs étape par étape pour constituer leur dossier GPSR. Pensé pour les non-juristes.",
      button: "Essayer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "cout-conformite-gpsr-tarifs-options",
    title: "Combien coûte la conformité GPSR en 2025 ? Tarifs réels et options économiques",
    description: "Cabinet conseil, tests laboratoire, logiciel spécialisé... Voici une comparaison honnête des coûts de mise en conformité GPSR selon votre situation, votre catalogue et vos ressources.",
    keywords: ["coût conformité GPSR", "prix dossier technique GPSR", "combien coûte GPSR", "budget conformité GPSR", "tarif expert GPSR"],
    publishedAt: "2025-06-03",
    readingTime: 5,
    category: "Réglementation",
    intro: "C'est la question que tout vendeur se pose en premier : combien ça va me coûter ? La conformité GPSR a une réputation de démarche coûteuse et complexe. Mais la réalité dépend énormément de votre situation : type de produit, taille de votre catalogue, et l'option que vous choisissez pour vous conformer. Voici une analyse honnête des coûts réels en 2025.",
    sections: [
      {
        heading: "Les différentes composantes du coût GPSR",
        body: [
          "La conformité GPSR a deux types de coûts bien distincts : les coûts obligatoires (que personne ne peut supprimer) et les coûts de mise en œuvre (qui varient selon la méthode choisie).",
          "**Coûts obligatoires** : dans la plupart des cas, le seul coût incompressible est votre temps. La rédaction d'un dossier technique, d'une analyse de risque et d'une déclaration de conformité ne nécessite pas de payer une autorité ou de déposer des frais. C'est un travail documentaire.",
          "Exception importante : les tests de laboratoire accrédités sont obligatoires pour certaines catégories de produits (jouets soumis à EN 71, appareils électriques, cosmétiques dans certains cas). Ces tests sont un coût fixe inévitable — aucun logiciel ni consultant ne peut les remplacer.",
          "**Coûts de mise en œuvre** : c'est ici que vous avez le choix entre plusieurs approches, avec des différences de coût très significatives.",
        ],
      },
      {
        heading: "Option 1 : Tout faire soi-même (coût : 0 € + temps)",
        body: [
          "Techniquement, rien n'interdit de constituer vous-même vos dossiers techniques GPSR. Les textes réglementaires sont publics, les guides de la Commission européenne sont gratuits, et des modèles de documents circulent en ligne.",
          "**Pour qui ça marche** : si vous avez 1 à 3 produits simples, une formation en droit ou en ingénierie, et du temps disponible.",
          "**Réalité du temps investi** : pour quelqu'un de non formé, comprendre les exigences du GPSR, identifier les normes applicables, structurer une analyse de risque selon ISO 12100, et rédiger tous les documents prend typiquement 2 à 5 jours pour le premier produit. Pour les suivants, 1 à 2 jours. Sur un catalogue de 20 produits, c'est 3 à 6 semaines de travail.",
          "**Risque** : sans expertise, il est facile de manquer des normes applicables, de mal structurer l'analyse de risque, ou d'omettre des mentions obligatoires. En cas de contrôle, un dossier incomplet peut être aussi problématique qu'un dossier absent.",
        ],
      },
      {
        heading: "Option 2 : Faire appel à un cabinet conseil spécialisé",
        body: [
          "Des cabinets de conseil en conformité (souvent des ingénieurs-conseils ou des juristes spécialisés en droit de la consommation européen) peuvent constituer vos dossiers pour vous.",
          "**Tarifs constatés en 2025** :",
          "— Dossier technique simple (produit non électronique, faible risque) : 300 à 600 €",
          "— Dossier technique complet avec analyse de risque approfondie : 700 à 1 500 €",
          "— Dossier complexe (électronique, jouets, avec tests) : 1 500 à 3 000 €",
          "— Audit de catalogue complet : 2 000 à 8 000 € selon la taille",
          "**Pour qui ça marche** : si vous avez peu de références (< 5), un produit à fort enjeu réglementaire (jouets, électronique médicale), ou si vous êtes en cas de contrôle et avez besoin d'un expert rapidement.",
          "**Inconvénient** : coût prohibitif pour un catalogue de 20, 50 ou 100 produits. Pour un vendeur Amazon avec 30 produits à 25 € de marge chacun, les dossiers peuvent coûter plus cher que le profit annuel.",
        ],
      },
      {
        heading: "Option 3 : Logiciel spécialisé (30 à 80 €/mois)",
        body: [
          "Des outils comme Conforva utilisent l'IA pour générer automatiquement dossiers techniques, analyses de risque et déclarations de conformité à partir des informations produit que vous saisissez.",
          "**Coût mensuel** : typiquement 30 à 80 €/mois selon le nombre de produits et les fonctionnalités.",
          "**Temps par référence** : 5 à 15 minutes pour saisir les informations produit et générer les documents.",
          "**Ce qu'un logiciel fait** : structure l'analyse de risque, identifie les normes harmonisées applicables, génère les sections du dossier technique, produit la déclaration de conformité et les étiquettes, met à jour les documents quand vous modifiez le produit.",
          "**Ce qu'un logiciel ne fait pas** : réaliser les tests de laboratoire, vous donner un conseil juridique sur votre situation spécifique, garantir la conformité au sens légal (la responsabilité reste la vôtre).",
          "**Pour qui ça marche** : vendeurs avec 5 à 200 références, toute catégorie de produit à risque faible ou modéré, structures sans budget pour des consultants.",
        ],
      },
      {
        heading: "Coûts des tests de laboratoire (quand c'est obligatoire)",
        body: [
          "Certains produits nécessitent des tests réalisés par un laboratoire accrédité (COFRAC en France, DAkkS en Allemagne, etc.). Ces coûts sont incompressibles :",
          "**Jouets (EN 71 partie 1 à 3)** : 400 à 1 200 € pour une gamme complète de tests",
          "**Appareils électriques (marquage CE)** : 1 000 à 3 000 € selon la complexité",
          "**Cosmétiques (test de stabilité, test dermatologique)** : 500 à 2 000 €",
          "**Bougies (tests incendie EN 15493)** : 300 à 600 €",
          "**Textiles (tests REACH, résistance colorants)** : 200 à 800 €",
          "Ces tests sont souvent mutualisables si vous avez plusieurs références similaires — un laboratoire peut tester une gamme entière à un tarif groupé.",
          "Bonne nouvelle : si vous achetez des produits auprès d'un fabricant établi et que ce fabricant a déjà ses propres tests, vous pouvez parfois vous appuyer sur ces tests pour votre propre conformité (avec accord du fabricant).",
        ],
      },
      {
        heading: "Tableau comparatif selon votre situation",
        body: [
          "**1 à 3 produits, faible risque** : 0 à 500 € (en faisant vous-même avec un peu d'accompagnement)",
          "**5 à 20 produits, risque modéré** : 300 à 1 500 € tout compris avec un logiciel (12 mois d'abonnement) OU 1 500 à 5 000 € avec un cabinet conseil",
          "**20 à 100 produits** : logiciel spécialisé clairement gagnant — 600 à 2 000 € par an vs 8 000 à 30 000 € en consultant",
          "**Produits nécessitant des tests** : ajouter 300 à 1 200 € par famille de produit pour les tests laboratoire, quelle que soit la méthode choisie",
        ],
      },
    ],
    conclusion: "La conformité GPSR n'est pas gratuite, mais elle est loin d'être aussi coûteuse que beaucoup le craignent — à condition de choisir la bonne approche selon sa situation. Pour la grande majorité des petits et moyens vendeurs, un outil logiciel couplé à des tests laboratoire ciblés représente le meilleur rapport qualité-coût. Le cabinet conseil se justifie pour les produits à fort enjeu ou les situations de contrôle. Et dans tous les cas, le coût de la non-conformité (suspension Amazon, amendes, rappel de produits) dépasse largement le coût de la mise en conformité.",
    cta: {
      heading: "Commencez avec Conforva — dès 0 € pour votre premier dossier",
      text: "Générez votre premier dossier technique gratuitement. Pas de carte bancaire requise.",
      button: "Essayer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-woocommerce-boutique-en-ligne",
    title: "WooCommerce et GPSR : mettre votre boutique en conformité en 2025",
    description: "Vous vendez avec WooCommerce ? Voici ce que le GPSR impose sur votre site : informations produit, personne responsable EU, documentation technique — et comment s'organiser efficacement.",
    keywords: ["GPSR WooCommerce", "conformité WooCommerce GPSR", "boutique WordPress GPSR", "GPSR site e-commerce", "WooCommerce obligations légales"],
    publishedAt: "2025-06-04",
    readingTime: 6,
    category: "E-commerce",
    intro: "Contrairement à Amazon ou Etsy qui imposent leurs propres contrôles de conformité, WooCommerce (et WordPress) ne vous demande rien. Personne ne viendra suspendre vos produits pour non-conformité GPSR — du moins, pas la plateforme. Mais les autorités de surveillance du marché, elles, peuvent contrôler votre boutique directement. Voici ce que vous devez mettre en place.",
    sections: [
      {
        heading: "Ce que le GPSR exige sur votre fiche produit WooCommerce",
        body: [
          "L'Article 9 du GPSR définit les informations que les opérateurs économiques doivent fournir avec chaque produit. Pour une boutique en ligne, ces informations doivent figurer sur la fiche produit ou être facilement accessibles depuis celle-ci :",
          "**Nom ou marque du fabricant** : votre raison sociale ou nom commercial doit être clairement visible.",
          "**Adresse de contact** : une adresse physique (pas uniquement une boîte postale) ou un email de contact dédié au support produit.",
          "**Description permettant l'identification du produit** : le nom commercial, la référence, et une description suffisante pour qu'un inspecteur puisse identifier le produit exact.",
          "**Avertissements et instructions de sécurité** : dans la langue du pays de l'acheteur. Si vous vendez à des clients français, allemands et espagnols, les avertissements doivent être dans ces trois langues.",
          "**Pour les produits avec risques spécifiques** : les mises en garde doivent être suffisamment visibles — pas cachées dans un onglet 'Détails techniques' en bas de page.",
        ],
      },
      {
        heading: "Les plugins WooCommerce pour la conformité GPSR",
        body: [
          "Plusieurs plugins WordPress/WooCommerce facilitent la mise en conformité GPSR. Leur utilité varie selon ce qu'ils font réellement :",
          "**Plugins d'affichage des informations produit** : permettent d'ajouter des champs structurés dans la fiche produit (fabricant, personne responsable, avertissements). Utiles pour standardiser l'affichage sur toutes vos fiches. Cherchez des plugins avec la mention 'GPSR compliance' sur le WordPress plugin directory.",
          "**Plugins de génération de documents** : rares et souvent limités. La génération de dossiers techniques complets (avec analyse de risque ISO 12100) nécessite une expertise métier que la plupart des plugins WordPress n'ont pas — préférez un logiciel spécialisé comme Conforva pour les documents, et un plugin WooCommerce pour l'affichage sur les fiches.",
          "**Plugins de gestion des cookies et CGV** : non spécifiques au GPSR, mais nécessaires pour la conformité globale de votre boutique (RGPD, mentions légales). Assurez-vous que vos CGV mentionnent votre politique de retour et de rappel de produits.",
        ],
      },
      {
        heading: "Structurer vos fiches produit pour la conformité",
        body: [
          "Voici comment organiser vos fiches WooCommerce pour respecter le GPSR sans surcharger vos pages :",
          "**Dans la description courte du produit** : les informations d'identification essentielles (votre marque, la référence) — elles apparaissent immédiatement visible sur la page.",
          "**Dans un onglet dédié 'Informations réglementaires'** : les avertissements de sécurité complets, les instructions d'utilisation, les mentions légales (Personne Responsable EU si applicable).",
          "**Dans les métadonnées produit** (utilisant un plugin ou du code personnalisé) : les informations structurées (schéma Product) qui permettent aux moteurs de recherche de comprendre votre produit et qui peuvent servir de base pour les contrôles.",
          "**Dans un PDF téléchargeable** : votre déclaration de conformité, téléchargeable depuis la fiche produit. C'est facultatif mais valorisant pour les clients professionnels (revendeurs B2B).",
        ],
      },
      {
        heading: "La Personne Responsable EU sur votre site WooCommerce",
        body: [
          "Si vous êtes établi dans l'UE, vous êtes vous-même votre personne responsable. Vos coordonnées complètes (raison sociale, adresse, email) doivent figurer de façon accessible — typiquement dans vos mentions légales et sur les fiches produit.",
          "Si vous êtes hors UE (Suisse, Maroc, USA, etc.) et que vous vendez à des clients européens via votre boutique WooCommerce, vous devez désigner un représentant légal établi dans l'UE. Cette personne ou société :",
          "— Doit avoir une adresse physique dans un État membre",
          "— Doit être joignable par les autorités de surveillance du marché",
          "— Doit pouvoir accéder à vos dossiers techniques en cas de contrôle",
          "— Doit être mentionnée sur les fiches produit concernées et dans vos mentions légales",
        ],
      },
      {
        heading: "Ce que WooCommerce ne fait pas (et que vous devez faire vous-même)",
        body: [
          "WooCommerce est un outil de vente, pas un outil de conformité. Il ne :",
          "— Ne vérifie pas l'existence de votre dossier technique",
          "— Ne contrôle pas la validité de votre personne responsable EU",
          "— Ne vous alerte pas si une norme applicable à vos produits est révisée",
          "— Ne génère pas vos documents réglementaires",
          "Tout cela reste votre responsabilité. La différence avec Amazon ou Etsy : vous n'aurez pas de suspension automatique sur WooCommerce — mais un contrôle de la DGCCRF ou d'une autre autorité peut aboutir à une mise en demeure, une amende, ou une injonction de retrait de vos produits.",
        ],
      },
    ],
    conclusion: "WooCommerce vous donne une liberté totale que les marketplaces ne donnent pas — mais cette liberté s'accompagne d'une responsabilité totale. Personne ne vérifie votre conformité à votre place. La bonne approche : utilisez un outil spécialisé pour constituer vos dossiers techniques, et configurez vos fiches produit WooCommerce pour afficher correctement les informations GPSR requises. C'est un investissement d'une journée pour des années de tranquillité.",
    cta: {
      heading: "Générez vos dossiers GPSR pour votre boutique WooCommerce",
      text: "Conforva produit les documents GPSR que vous pouvez ensuite référencer dans vos fiches produit. Simple, rapide, conforme.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
  {
    slug: "gpsr-textile-vetements-mode",
    title: "GPSR et textile / vêtements : obligations spécifiques pour les vendeurs de mode en 2025",
    description: "Vêtements, accessoires de mode, textiles pour enfants : le GPSR s'applique avec des exigences spécifiques. Étiquetage, substances chimiques, sécurité enfants — tout ce que vous devez savoir.",
    keywords: ["GPSR textile", "GPSR vêtements", "conformité mode GPSR", "GPSR habillement", "GPSR vêtements enfants", "REACH textile"],
    publishedAt: "2025-06-05",
    readingTime: 6,
    category: "Textile",
    intro: "Le secteur de la mode en ligne est en pleine explosion — et l'une des catégories les plus contrôlées par les autorités de surveillance du marché européennes. Si vous vendez des vêtements, des accessoires, ou des textiles d'une manière générale sur Amazon, Etsy, votre site, ou en dropshipping, voici précisément ce que le GPSR (et la réglementation textile complémentaire) vous impose.",
    sections: [
      {
        heading: "GPSR + réglementation textile : deux ensembles d'obligations",
        body: [
          "Pour les vendeurs de textile, la conformité se joue sur deux tableaux distincts mais complémentaires :",
          "**Le GPSR (règlement UE 2023/988)** s'applique à tous les textiles en tant que produits de consommation. Il impose les obligations de base : dossier technique, identification du fabricant, analyse de risque, personne responsable EU.",
          "**Le règlement textile (UE) 1007/2011** impose des obligations spécifiques supplémentaires : dénomination des fibres textiles et étiquetage de composition obligatoire dans la langue du pays de vente.",
          "**Le règlement REACH (CE) 1907/2006** s'applique aux substances chimiques présentes dans les textiles : colorants, traitements de finition, imperméabilisants, etc. Certaines substances sont totalement interdites dans les textiles en contact avec la peau.",
          "Ces trois règlements doivent être respectés simultanément. Un vêtement peut être conforme GPSR mais non conforme REACH (si les colorants contiennent des amines aromatiques interdites), ou conforme REACH mais sans étiquetage textile adéquat.",
        ],
      },
      {
        heading: "L'étiquetage textile obligatoire : ce qui doit figurer sur chaque vêtement",
        body: [
          "Tout textile vendu dans l'UE doit porter une étiquette avec les informations suivantes, dans la langue du pays de vente :",
          "**Composition des fibres** : le pourcentage de chaque fibre textile selon les dénominations officielles du règlement 1007/2011 (ex : « 100 % coton », « 80 % polyester, 20 % élasthanne »). Ni « coton doux » ni « tissu naturel » ne sont acceptables — vous devez utiliser les dénominations normalisées.",
          "**Instructions d'entretien** : pictogrammes ISO 3758 (lavage, séchage, repassage, nettoyage à sec). Ces pictogrammes sont reconnus dans toute l'UE et ne nécessitent pas de traduction.",
          "**Pays de fabrication** : n'est pas obligatoire en vertu du règlement textile, mais est requis pour les importations soumises à certains contrôles douaniers. De facto, il est fortement recommandé de l'indiquer.",
          "**Pour les vêtements pour enfants** : des informations supplémentaires sur les cordons et lacets (directive 2011/96/UE — cordon potentiellement dangereux) sont souvent requises, notamment l'absence de cordons fonctionnels dans l'encol-ure pour les enfants < 7 ans.",
        ],
      },
      {
        heading: "REACH et substances chimiques dans les textiles",
        body: [
          "Le règlement REACH interdit ou limite plusieurs familles de substances chimiques dans les textiles destinés à entrer en contact avec la peau humaine. Les contrôles sont fréquents et les produits non conformes sont régulièrement retirés du marché.",
          "**Amines aromatiques** : certains colorants azoïques se dégradent en amines aromatiques cancérigènes. Leur concentration est limitée à 30 mg/kg dans les articles en contact avec la peau. Ce contrôle est réalisé par test chimique en laboratoire.",
          "**Nickel** : pour les parties métalliques des vêtements (fermetures, boucles, boutons) en contact prolongé avec la peau, la migration de nickel est limitée à 0,5 μg/cm²/semaine.",
          "**Formaldéhyde** : utilisé dans certains traitements anti-froissage. Interdit au-dessus de certains seuils dans les textiles pour enfants.",
          "**Phtalates** : dans les plastiques souples (faux cuir, parements plastiques). Interdit au-dessus de 0,1% pour certains phtalates dans les articles pour enfants.",
          "Si vous achetez vos textiles chez un fabricant établi, demandez systématiquement les certificats OEKO-TEX Standard 100 ou GOTS — ils couvrent la plupart de ces exigences REACH et simplifient votre conformité.",
        ],
      },
      {
        heading: "Vêtements pour enfants : obligations renforcées",
        body: [
          "Les vêtements pour enfants sont soumis à des exigences de sécurité physique plus strictes en plus des exigences chimiques :",
          "**Cordons et lacets** (guide EN 14682) : les vêtements pour enfants de 7 ans et moins ne doivent pas avoir de cordons fonctionnels dans l'encol-ure ou le capuchon. Les cordons à d'autres emplacements doivent respecter des longueurs maximales strictes.",
          "**Petits accessoires** : boutons, ornements et pièces décoratives qui peuvent se détacher doivent être testés en traction — un bouton qui se détache facilement et représente un risque d'étouffement est interdit.",
          "**Liens de serrage** (pour les vêtements de 7 à 14 ans) : des exigences spécifiques s'appliquent aux liens de serrage sur les capuches, poches et ourlets.",
          "Ces exigences sont vérifiables par des tests physiques standardisés — tests d'arrachage, tests de traction selon EN 71-1 pour les petits éléments.",
        ],
      },
      {
        heading: "Dropshipping textile : votre responsabilité en tant que vendeur",
        body: [
          "Le dropshipping textile depuis la Chine ou d'autres pays tiers est l'une des catégories les plus à risque. Les produits ne passent pas par vos mains, mais si vous les vendez sous votre marque ou sur votre site, vous êtes légalement l'importateur ou le distributeur au sens du GPSR.",
          "Ce que vous devez faire :",
          "— Exiger les certificats de conformité de votre fournisseur (REACH, composition fibres, tests pertinents)",
          "— Vérifier que l'étiquetage est conforme au règlement textile UE (composition en français si vous vendez en France)",
          "— Constituer votre propre dossier technique même si vous n'avez pas accès au dossier du fabricant — vous documentez ce que vous connaissez du produit",
          "— Désigner une personne responsable EU si vous n'êtes pas établi dans l'UE",
          "Les contrôles douaniers aux frontières UE s'intensifient sur les textiles importés. Un lot sans documentation de conformité peut être retenu, voire détruit.",
        ],
      },
    ],
    conclusion: "Le textile est l'une des catégories les mieux contrôlées par les autorités européennes — et l'une des plus fréquemment épinglées sur les plateformes de surveillance RAPEX. Si vous vendez de la mode en ligne, la conformité GPSR combinée aux obligations textile et REACH n'est pas optionnelle. La bonne approche : travaillez avec des fournisseurs qui peuvent vous fournir des certifications (OEKO-TEX, GOTS), constituez des dossiers techniques pour vos références principales, et assurez-vous que votre étiquetage est correct dans chaque langue de vente.",
    cta: {
      heading: "Constituez vos dossiers techniques textile rapidement",
      text: "Conforva génère dossier technique et analyse de risque pour vos produits textile en quelques minutes.",
      button: "Commencer gratuitement",
      href: "/auth/login",
    },
  },
]

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
