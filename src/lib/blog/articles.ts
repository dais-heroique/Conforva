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
    slug: "gpsr-guide-complet-ecommerçants",
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
]

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
