// Dati statici: `id` → project.html?id=<id>
window.PORTFOLIO_PROJECTS = {
  projects: [
    {
      id: 'iot-architettura-ibrida-agrifood-biogas',
      title: "IoT & Data Integration: Architettura Ibrida per l'AgriFood (Biogas)",
      summary:
        'Focus: Industrial IoT, Data Integrity e On-premises Integration.',
      icon: '🌾',
      tags: [
        'Dynamics 365',
        'Power Automate',
        'On-premises Data Gateway',
        'Dataverse',
        'PLC Logic Integration',
      ],
      heroImage:
        'https://images.unsplash.com/photo-1673208769691-e74104d853fd?auto=format&fit=crop&w=1400&q=80',
      heroImageAlt:
        'Grandi serbatoi bianchi su campo verde, tipici di un impianto biogas in contesto agricolo.',
      metaDescription:
        'Scenario: Monitoraggio e gestione dei flussi di materiale per impianti di produzione biogas distribuiti. La necessità era centralizzare dati fisici provenienti dal campo in un ambiente cloud per l\'analisi dei costi e della produzione.',
      featured: true,
      featuredOrder: 1,
      body: [
        'Focus: Industrial IoT, Data Integrity e On-premises Integration.',
        'Scenario: Monitoraggio e gestione dei flussi di materiale per impianti di produzione biogas distribuiti. La necessità era centralizzare dati fisici provenienti dal campo in un ambiente cloud per l\'analisi dei costi e della produzione.',
        'Sfida Tecnica: Realizzare un ponte sicuro e bidirezionale tra i PLC di campo, che operano su reti locali, e il Dataverse. Era fondamentale garantire che le quantità di biomasse (in ingresso nelle trincee e in immissione nelle tramogge) fossero sincronizzate senza latenze critiche.',
        'Soluzione: Progettazione di un\'architettura basata su On-premises Data Gateway. Ho sviluppato flussi dati che interrogano i database locali collegati ai PLC, orchestrando l\'ingestione dei dati verso il cloud tramite Power Automate. La soluzione gestisce la manutenzione degli impianti e il tracciamento dei costi dei fornitori, trasformando segnali industriali in record di business pronti per la fatturazione.',
        'Risultato: Eliminazione completa dell\'inserimento manuale su carta o Excel, azzeramento dell\'errore umano nella trascrizione delle pesate e monitoraggio in tempo reale dei KPI di efficienza energetica degli impianti.',
        'Stack: Dynamics 365, Power Automate, On-premises Data Gateway, Dataverse, PLC Logic Integration.',
      ],
    },
    {
      id: 'digital-transformation-hub-no-profit-internazionale',
      title: 'Digital Transformation: Hub per il No-Profit Internazionale',
      summary: 'Focus: Process Reengineering e Integrazione ERP Legacy.',
      icon: '🌐',
      tags: [
        'Power Apps',
        'Power Automate',
        'Dynamics NAV (Navision)',
        'Dataverse',
      ],
      heroImage:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80',
      metaDescription:
        'Scenario: Un\'organizzazione non-profit operante prevalentemente in Africa necessitava di unificare la gestione dei sostenitori a distanza e il monitoraggio dei finanziamenti ai progetti etici.',
      featured: true,
      featuredOrder: 2,
      body: [
        'Focus: Process Reengineering e Integrazione ERP Legacy.',
        'Scenario: Un\'organizzazione non-profit operante prevalentemente in Africa necessitava di unificare la gestione dei sostenitori a distanza e il monitoraggio dei finanziamenti ai progetti etici.',
        'Sfida Tecnica: Integrare un ecosistema frammentato dove le anagrafiche nascevano sul portale web, mentre la gestione finanziaria e i pagamenti risiedevano su Microsoft Dynamics NAV (Navision).',
        'Soluzione: Sviluppo di una piattaforma centralizzata in Power Apps (Model-Driven). Ho implementato l\'integrazione tramite Power Automate utilizzandolo come Web Service e per automatizzare le logiche: i dati dei sostenitori vengono acquisiti dal sito web, validati e sincronizzati. Contemporaneamente, il sistema interroga Navision per recuperare lo stato dei pagamenti e le scadenze, aggiornando il profilo del donatore. Fornendo di conseguenza agli operatori un\'applicazione per la riconcilizione dei pagamenti.',
        'Risultato: Creazione di una "Single Source of Truth" per l\'organizzazione. Automazione del ciclo di vita del sostegno a distanza, con avvisi automatici sulle scadenze e una gestione trasparente dei flussi economici tra sede e progetti locali.',
        'Stack: Power Apps (Model-Driven), Power Automate, Dynamics NAV (Navision), Dataverse.',
      ],
    },
    {
      id: 'business-process-management-crm-sartoriale',
      title: 'Business Process Management: Custom CRM "Sartoriale"',
      summary: 'Focus: Pro-Code Extensibility e Software Design.',
      icon: '🏢',
      tags: [
        'Dynamics 365 Sales',
        'JavaScript',
        'Advanced Data Modeling',
        'Power Platform',
      ],
      heroImage:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
      metaDescription:
        'Scenario: Progetto di Reengineering per aziende con modelli di vendita complessi che non trovano riscontro nelle funzionalità "out-of-the-box" dei CRM standard.',
      featured: true,
      featuredOrder: 3,
      body: [
        'Focus: Pro-Code Extensibility e Software Design.',
        'Scenario: Progetto di Reengineering per aziende con modelli di vendita complessi che non trovano riscontro nelle funzionalità "out-of-the-box" dei CRM standard.',
        'Sfida Tecnica: Estendere Dynamics 365 Sales ben oltre la semplice configurazione, implementando logiche di business condizionali profonde e un\'interfaccia utente ottimizzata per flussi approvativi multi-livello.',
        'Soluzione: Sviluppo di una soluzione customizzata tramite JavaScript Web Resources per la manipolazione dinamica della UI e l\'implementazione di Business Rules avanzate. Ho progettato un modello dati relazionale su Dataverse ottimizzato per la manutenibilità, riducendo al minimo il debito tecnico e garantendo la scalabilità in caso di aggiornamenti della piattaforma Microsoft.',
        'Risultato: Aumento significativo dell\'adozione dello strumento da parte della forza vendita grazie a un\'interfaccia cucita sui processi reali e non viceversa. Riduzione del "time-to-close" delle trattative grazie all\'automazione dei flussi approvativi.',
        'Stack: Dynamics 365 Sales, JavaScript, Advanced Data Modeling, Power Platform.',
      ],
    },
    {
      id: 'identity-data-hub-ticketing-sportivo',
      title: 'Identity & Data Hub: Ecosistema per il Ticketing Sportivo',
      summary: 'Focus: Master Data Management e Orchestrazione SSO.',
      icon: '⚽',
      tags: [
        'Dataverse',
        'Power Automate',
        'SSO Integration',
        'External API Integration (Ticketing & Loyalty)',
      ],
      heroImage:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80',
      heroImageAlt:
        'Pallone da calcio su prato verde, soggetto centrale e leggibile nel banner.',
      metaDescription:
        'Scenario: Gestione dei dati e dei titoli di accesso per una società calcistica professionistica con decine di migliaia di tifosi.',
      featured: true,
      featuredOrder: 4,
      body: [
        'Focus: Master Data Management e Orchestrazione SSO.',
        'Scenario: Gestione dei dati e dei titoli di accesso per una società calcistica professionistica con decine di migliaia di tifosi.',
        'Sfida Tecnica: Far dialogare sistemi di ticketing esterni, piattaforme di Fidelity Card e portali web proprietari, utilizzando il Dataverse come "Centro Stella" dell\'intera architettura.',
        'Soluzione: Architettura incentrata sulla sincronizzazione di più servizi. Quelli ticketing e fidelity scrivono le anagrafiche e i titoli di accesso sul Dataverse tramite Web Services dedicati. Ho configurato il flusso in modo che il portale web, tramite protocolli di Single Sign-On, riconosca l\'utente e interroghi il Dataverse per mostrare i dati corretti aggiornati. Power Automate agisce da orchestratore, gestendo i conflitti di sincronizzazione e la pulizia dei dati.',
        'Risultato: Visione profonda e completa del tifoso. L\'utente può accedere a tutti i servizi della società con un\'unica identità, mentre il club ha il controllo totale sui dati di accesso e le preferenze di acquisto in tempo reale.',
        'Stack: Dataverse, Power Automate, SSO Integration, External API Integration (Ticketing & Loyalty).',
      ],
    },
    {
      id: 'fintech-crm-bancario-alte-prestazioni',
      title: 'Fintech: CRM Bancario ad Alte Prestazioni',
      summary: 'Focus: Real-time Data Fetching e Integrazione fonia (IVR).',
      icon: '🏦',
      tags: [
        'Dynamics 365 Customer Service',
        'Custom Web Resources (HTML/JS)',
        'IVR',
        'API Security',
        'Batch Processing',
      ],
      heroImage:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
      metaDescription:
        'Scenario: Implementazione di un sistema CRM per un istituto bancario con esigenze rigorose di sicurezza e velocità di accesso al dato finanziario.',
      featured: true,
      featuredOrder: 5,
      body: [
        'Focus: Real-time Data Fetching e Integrazione Fonia (IVR).',
        'Scenario: Implementazione di un sistema CRM per un istituto bancario con esigenze rigorose di sicurezza e velocità di accesso al dato finanziario.',
        'Sfida Tecnica: Gestire l\'importazione quotidiana di flussi massivi (file CSV bancari) e, contemporaneamente, visualizzare dati sensibili in tempo reale che non possono essere persistiti permanentemente per policy di sicurezza.',
        'Soluzione: Sviluppo di processi batch per l\'elaborazione dei file giornalieri. Per i dati real-time, ho creato Web Resources personalizzate (HTML/JS) che effettuano chiamate sincrone sicure verso i servizi web della banca, visualizzando le informazioni contestuali all\'operatore. Inoltre, integrando il sistema IVR, ho gestito la logica di ricerca dell\'utente e il login tramite chiamate API che identificano il cliente dal numero telefonico o ID inserito, aprendo automaticamente la scheda anagrafica corretta all\'operatore.',
        'Risultato: Ottimizzazione drastica del Customer Service bancario. Gli operatori hanno accesso immediato ai dati finanziari protetti e il sistema di riconoscimento telefonico ha ridotto i tempi di autenticazione del cliente.',
        'Stack: Dynamics 365 Customer Service, Custom Web Resources (HTML/JS), IVR, API Security, Batch Processing.',
      ],
    },
  ],
};
