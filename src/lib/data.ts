import { BlogPost, GalleryImage, Testimonial, Donation, Program } from "@/types";

export const IMPACT_STATS = {
  widowsReached: "2,000+",
  foodPackages: "1,000+",
  communities: "250+",
  scholarships: "120+",
  yearsOfImpact: 9,
};

export const PROGRAMS: Program[] = [
  {
    id: "spiritual-restoration",
    title: "Spiritual Restoration",
    description: "Rebuilding faith and providing a safe haven for spiritual growth through weekly fellowship and prayer groups.",
    icon: "church",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG6UbAQA1KC4UVjYUEkQiitVckrOi1QJ1sGYB_FdV2WZUAj7CwkOr9KROsjppbzzgA1sh6wLJRTgMs-FPG2-6W6cqgynXEMyhSxJopPBQn3NmeMHeL56LdEkfs7_hH5ktSATbqmgPCbQnu8i6AuccgvumS745vtEH4y-jotnwtlOTHB8Opp4Yx7vEojKYUoPveCRKn9PYJgXdP4Wnn70yj4ylgPnzymFcB4u_zXqDrwBgEPow9tsXjBBpq3IOWkBnmi7qDoK46K94",
    longDescription: "YOKM was founded on the belief that spiritual nourishment is the bedrock of healing. Our Spiritual Restoration program hosts weekly fellowships, bible studies, and counseling sessions designed to restore peace, hope, and faith to widows who are walking through grief and isolation. We believe in being the physical hands and feet of Christ, offering an environment of prayer and community support.",
    achievements: [
      "Over 400 weekly prayer fellowship sessions conducted",
      "One-on-one pastoral counseling for grieving widows",
      "Annual Thanksgiving & Fellowship retreats",
      "Distribution of Bibles and spiritual devotionals"
    ]
  },
  {
    id: "vocational-training",
    title: "Vocational Training",
    description: "Empowering widows with sustainable skills like tailoring, agriculture, and small-scale business management to ensure financial independence.",
    icon: "school",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSR3c_YGp7XGGWfk7kMUJnMmtaE5K8AHpeWRRqAWokjaWkdXBJxg2ss6f6-o0pW23_rawJtm6vb6RfzhvIyu5OFxMWshHcbz5gOduESRcyF1qsGgSVY5RabxMdxkhDmsMaF22NuQcxh4FUVCBK16nsUWM5Rw2APYLcx6uzTr2er3KyEnHwTOt-SHYCg97jzL2YhJRhtBf2-bkrj3kVmk0JxejMtmDRFHexGMjMf4Rgpg-yFlQeVt6GXE5J8MnLVvBTvQsMTMWr0c",
    longDescription: "We believe in hand-ups, not just hand-outs. Our Vocational Training program provides hands-on instruction in tailoring, weaving, soap-making, and small-scale sustainable agriculture. Upon graduation, widows receive startup kits (such as sewing machines or seed crops) and micro-grants to help them establish independent livelihoods, allowing them to support their households and send their children to school.",
    achievements: [
      "250+ widows graduated with tailoring and textile design certifications",
      "Over 100 micro-grants distributed for agricultural startups",
      "Lagos Vocational Center launched to train 500 women annually",
      "95% business survival rate among our training graduates"
    ]
  },
  {
    id: "healthcare-access",
    title: "Healthcare Access",
    description: "Providing medical check-ups, insurance support, and mental health counseling for widows and their orphaned children.",
    icon: "health_and_safety",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3qVzAqxVRaAbJyJ2mPW95JstJOsbdG0gM0siUPgkwZrvuK8MXm7bNymG_IX3_Z1Sn6a4PmEIzv_Tof4mFQYu1nF7OAQ1NLT6-BQ4zw1BmF6qeOjpK0euZXFkYBwWwXxHb_zFs8aWKJ52kMN9MTEUsQqhGVjPJY8FDRXLG0zYUYKk3iRvq1lx50GNgxGFHBGmLcL-HeAx1z7EssvSpXrJONhzi2un2gSFDX6lwWxd4K40qesySnWUQ0OoLHTE2jA7atnUWEAHRwRI",
    longDescription: "Medical expenses can be devastating for a single-income family. Our Healthcare Access program runs free quarterly medical outreaches, health education programs, and covers medical insurance subscriptions for the most vulnerable families. Additionally, we provide specialized grief counseling and mental health support groups to address the trauma of loss.",
    achievements: [
      "1,200+ individuals treated in free quarterly medical clinics",
      "Over 300 children enrolled in health insurance plans",
      "Regular health seminars on sanitation, nutrition, and disease prevention",
      "Dedicated professional therapist leading monthly grief counseling"
    ]
  },
  {
    id: "legal-advocacy",
    title: "Legal Advocacy",
    description: "Protecting property rights and offering legal aid to widows facing discrimination or unlawful dispossession.",
    icon: "gavel",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCul8xnJqBNWlldmaqd2ZayKND4q-Fm2Yi6E68SBo2PeiJ51zt5z9xI3a_3YmCUr5BzvvFbi7QIiv7uKYwlELo5Ka_gs1L4j5T0ZO8Nlf9kT_M_6x6uBnW5LIXvf1ttadrrRoQ3S63o4ol2SVxMObeFaYFzjGOxELisfYBNVus4OPjyke912ka1D_Ri1cA1czvoUTVQCen19Qn_lpNMuxZRqt7g1mfGTWO2rn-AuM3HR2ID1ueUXYOQ5_j0quFEytrVzbDeeVi95dM",
    longDescription: "In many communities, widows face unlawful eviction, property dispossession, and discrimination due to harmful traditional practices. YOKM partners with human rights lawyers to provide free legal representation and counseling to secure land, property, and custody rights for widows. We also work on a broader scale, raising awareness about inheritance rights in rural communities.",
    achievements: [
      "50+ legal disputes resolved in favor of dispossessed widows",
      "Established hotlines for emergency evictions and protection",
      "Advocacy seminars in 20+ local government council areas",
      "Educational leaflets on widow property rights published in 3 local languages"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah A.",
    role: "Tailoring Shop Owner",
    content: "After my husband passed away, my family was evicted. YOKM welcomed me, taught me how to sew, and gave me a sewing machine. Today, my tailoring business is thriving, and I can pay my children's university tuition. God has been faithful through Mama Alice and the ministry.",
    location: "Lagos, Nigeria",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmUTpG6diNK9zffZUuW0pImJ7um-Jj0Uj26iZCnXNmi7JFlEBh1o-FnllraAeENiInyWtyQD_LTH2xLcmHSRW0J1AVyvfxZNx04RNe0bF9cxrUtBQMnC6o0YRA69kGapYUcpzcmKPnPrCRpnOWah8qHs3fEdQcnxEfjRGNrJvYQYweayWJV5cYVZSgCbk1fhDBf5EncRXoOSGrFFr8ArEwY7VHgOFqoBcSpFRH_-wZqifUMAMmIb7fEywDsnDHXqiJ-i5vV3TtU1A"
  },
  {
    id: "2",
    name: "Grace O.",
    role: "Mother & Small Scale Farmer",
    content: "YOKM provided me with agricultural starter seed crops and training in modern farming techniques. The local fellowship has also restored my spirit. I no longer feel alone or abandoned. I now have hope and bread for my family.",
    location: "Kwara State, Nigeria"
  },
  {
    id: "3",
    name: "Deborah M.",
    role: "Community Teacher",
    content: "My three children received educational scholarships from YOKM when we had no hope. Today, they are excelling in their studies. The legal advocacy team also helped me protect our family land when relatives wanted to seize it. We are eternally grateful.",
    location: "Abuja, Nigeria"
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG6UbAQA1KC4UVjYUEkQiitVckrOi1QJ1sGYB_FdV2WZUAj7CwkOr9KROsjppbzzgA1sh6wLJRTgMs-FPG2-6W6cqgynXEMyhSxJopPBQn3NmeMHeL56LdEkfs7_hH5ktSATbqmgPCbQnu8i6AuccgvumS745vtEH4y-jotnwtlOTHB8Opp4Yx7vEojKYUoPveCRKn9PYJgXdP4Wnn70yj4ylgPnzymFcB4u_zXqDrwBgEPow9tsXjBBpq3IOWkBnmi7qDoK46K94",
    alt: "Community Workshop Support",
    category: "Vocational",
    caption: "Widows collaborating and learning tailor craft at the Lagos center."
  },
  {
    id: "g2",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSR3c_YGp7XGGWfk7kMUJnMmtaE5K8AHpeWRRqAWokjaWkdXBJxg2ss6f6-o0pW23_rawJtm6vb6RfzhvIyu5OFxMWshHcbz5gOduESRcyF1qsGgSVY5RabxMdxkhDmsMaF22NuQcxh4FUVCBK16nsUWM5Rw2APYLcx6uzTr2er3KyEnHwTOt-SHYCg97jzL2YhJRhtBf2-bkrj3kVmk0JxejMtmDRFHexGMjMf4Rgpg-yFlQeVt6GXE5J8MnLVvBTvQsMTMWr0c",
    alt: "Sewing Workshop collaboration",
    category: "Vocational",
    caption: "Vocational trainers teaching textile weaving and fashion patterns."
  },
  {
    id: "g3",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3qVzAqxVRaAbJyJ2mPW95JstJOsbdG0gM0siUPgkwZrvuK8MXm7bNymG_IX3_Z1Sn6a4PmEIzv_Tof4mFQYu1nF7OAQ1NLT6-BQ4zw1BmF6qeOjpK0euZXFkYBwWwXxHb_zFs8aWKJ52kMN9MTEUsQqhGVjPJY8FDRXLG0zYUYKk3iRvq1lx50GNgxGFHBGmLcL-HeAx1z7EssvSpXrJONhzi2un2gSFDX6lwWxd4K40qesySnWUQ0OoLHTE2jA7atnUWEAHRwRI",
    alt: "Food distribution act",
    category: "Outreach",
    caption: "Feeding 2,000 Widows initiative distributing basic food packages."
  },
  {
    id: "g4",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtA2RYx629bqQYoLtp9-uJsp6sQGxfhV0hAebQIKJRHWNGERQzKasKDmIf_ugMKZccaD8_xGCtIlSulSwVsMceGoRzFv8LG6MEdXYxUGle84qvJWVu2WisBcU6hpopNR-lWcZzoeU1IQquzSxUbXqTvAXwbfZtBtgf7Sj9O-aCHW0Dn4ww7eoy6TwN4r1-u56cdf_QaWBCm-8poyLY--zz4ZmS4HE0jFh1MoHV9JEcKJbBlx37ZCN89c2upPKLUotq46G4bG-9Hk4",
    alt: "Community outreach program",
    category: "Outreach",
    caption: "Annual outreach clinic providing health screenings and free checks."
  },
  {
    id: "g5",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQpd5iCYoQSjA20FD1Xhiwfl_z91Y1USLivbCc25bu665Puos705zHvS7DRiVrL_ZuEJqabCk79Hvc3MZEmUKP4QmxPcVJy6lrTq7xkPE-Fd9UEhE1CHUglqKe8znecAYHmIp7VaU0vRs06AjMlAtAfw7haCBjbT6fb-GAy5zMyvRMu5ZSWz19p6ba5LP7mGZvk23_v1JGNknpYJuRzfAcbBdNsayrI_8KmDeBK_kVLqlyEwFTxkG9ytqUkdQs9SSzLL6zd3n71sY",
    alt: "Hand weaving textile close up",
    category: "Community",
    caption: "Beautiful hand-woven garments created by local widow support units."
  },
  {
    id: "g6",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwV7Vu9tDamErpEsSsy1tdKBOmk2gqwlIcc-CYP8cdMGW0Ojx8j0bGuWsdMZzNiouBOQSxGYkYIdptQ9NP76OI126aXsPOiyIRnVDw9V3vA5j2kcSlAWDDWbCUXF-jgCdX9dVyhG_6u1Pu0t5-PvprPk-_0Ftoyng-453BJI89pj4czqWhTQTSZGcMmD0uykY4UtIVsPDk2Bp1VHLyO3VRep64cJodXlew99Ot_8IzY2sKJhO_vVeUC-jNO09_9RbkpJyNkTF7eJs",
    alt: "Outdoor community meeting",
    category: "Fellowship",
    caption: "Weekly prayer and restoration circle in Abuja Cathedral Hall."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Lagos Empowerment Center Opens",
    slug: "lagos-empowerment-center-opens",
    excerpt: "A new hub for widow vocational training officially launched in Lagos to serve over 500 members annually.",
    category: "Programs",
    publishedAt: "Oct 24, 2024",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtA2RYx629bqQYoLtp9-uJsp6sQGxfhV0hAebQIKJRHWNGERQzKasKDmIf_ugMKZccaD8_xGCtIlSulSwVsMceGoRzFv8LG6MEdXYxUGle84qvJWVu2WisBcU6hpopNR-lWcZzoeU1IQquzSxUbXqTvAXwbfZtBtgf7Sj9O-aCHW0Dn4ww7eoy6TwN4r1-u56cdf_QaWBCm-8poyLY--zz4ZmS4HE0jFh1MoHV9JEcKJbBlx37ZCN89c2upPKLUotq46G4bG-9Hk4",
    author: {
      name: "Evangelist Alice",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmUTpG6diNK9zffZUuW0pImJ7um-Jj0Uj26iZCnXNmi7JFlEBh1o-FnllraAeENiInyWtyQD_LTH2xLcmHSRW0J1AVyvfxZNx04RNe0bF9cxrUtBQMnC6o0YRA69kGapYUcpzcmKPnPrCRpnOWah8qHs3fEdQcnxEfjRGNrJvYQYweayWJV5cYVZSgCbk1fhDBf5EncRXoOSGrFFr8ArEwY7VHgOFqoBcSpFRH_-wZqifUMAMmIb7fEywDsnDHXqiJ-i5vV3TtU1A"
    },
    featured: true,
    content: `<p>We are thrilled to announce the official opening of our new Lagos Vocational Empowerment Center. Located in a central, accessible hub, this state-of-the-art training center is designed to support more than 500 widows annually.</p>
    <p>Our focus is to provide a complete pathway from grief to independence. The center will run daily classes in tailoring, embroidery, agricultural business management, and digital literacy. Equipped with modern facilities, the center is a testament to what is possible when community support and faith come together.</p>
    <blockquote>"This center is not just a building; it is a laboratory of hope and restoration. Here, dreams are revived and futures are secured," shared Evangelist Alice during the dedication ceremony.</blockquote>
    <p>We invite local partners, volunteers, and mentors to join us in making this launch a sustainable success. Reach out to see how you can get involved today.</p>`
  },
  {
    id: "b2",
    title: "From Struggle to Business Owner",
    slug: "from-struggle-to-business-owner",
    excerpt: "How Sarah used our seed grant to start a successful tailoring business and send her children to university.",
    category: "Success Stories",
    publishedAt: "Oct 10, 2024",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQpd5iCYoQSjA20FD1Xhiwfl_z91Y1USLivbCc25bu665Puos705zHvS7DRiVrL_ZuEJqabCk79Hvc3MZEmUKP4QmxPcVJy6lrTq7xkPE-Fd9UEhE1CHUglqKe8znecAYHmIp7VaU0vRs06AjMlAtAfw7haCBjbT6fb-GAy5zMyvRMu5ZSWz19p6ba5LP7mGZvk23_v1JGNknpYJuRzfAcbBdNsayrI_8KmDeBK_kVLqlyEwFTxkG9ytqUkdQs9SSzLL6zd3n71sY",
    author: {
      name: "John Doe"
    },
    featured: false,
    content: `<p>When Sarah's husband passed away in 2021, she found herself alone with three children, facing eviction and lacking formal employment. Through our local fellowship partners, Sarah was introduced to YOKM.</p>
    <p>Sarah enrolled in our six-month fashion design and tailoring curriculum. She was dedicated, often staying late to master her craft. Upon her graduation, the ministry supplied her with a brand-new mechanical sewing machine and a seed grant of ₦50,000.</p>
    <p>Today, Sarah runs a thriving shop in Kwara State. She has hired two apprentices and has successfully sent her eldest daughter to university. Her story is a shining example of how practical empowerment, paired with spiritual restoration, can break the cycle of poverty and restore human dignity.</p>`
  },
  {
    id: "b3",
    title: "Bringing Clean Water to Central Region",
    slug: "bringing-clean-water-to-central-region",
    excerpt: "YOKM launches clean water borehole wells in rural communities to support sanitation and widow-led households.",
    category: "Programs",
    publishedAt: "Sep 15, 2024",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwV7Vu9tDamErpEsSsy1tdKBOmk2gqwlIcc-CYP8cdMGW0Ojx8j0bGuWsdMZzNiouBOQSxGYkYIdptQ9NP76OI126aXsPOiyIRnVDw9V3vA5j2kcSlAWDDWbCUXF-jgCdX9dVyhG_6u1Pu0t5-PvprPk-_0Ftoyng-453BJI89pj4czqWhTQTSZGcMmD0uykY4UtIVsPDk2Bp1VHLyO3VRep64cJodXlew99Ot_8IzY2sKJhO_vVeUC-jNO09_9RbkpJyNkTF7eJs",
    author: {
      name: "Jane Smith"
    },
    featured: false,
    content: `<p>Access to clean water is a fundamental right. In many rural communities, widows and children must walk miles daily to collect water, which takes away from schooling and economic activities.</p>
    <p>Last month, YOKM successfully built and dedicated three new solar-powered borehole wells in the Central Region. These boreholes provide safe, potable water to over 1,500 families, significantly lowering rates of water-borne illnesses and saving precious hours every single day.</p>
    <p>The management of these wells has been entrusted to local widow committees, granting them leadership positions and a voice within their communities.</p>`
  },
  {
    id: "b4",
    title: "Empowering the Next Generation",
    slug: "empowering-the-next-generation",
    excerpt: "Introducing our educational scholarship program and how it provides books, uniforms, and tuition for orphan children.",
    category: "Education",
    publishedAt: "Aug 28, 2024",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0nO2QfnhUFMRfN-c-yhxZAaDDQz8Ei8bcGzrFxhm0aPrqhvqf9gjdOdS93n_FfL7BJu9CLPdg5IKV1igxhvsWdNqocac37MXMvNAzynPpFqrS8vMQTegtoIC9qJlrBj4ekOUORcJJIj2Hm48-5p9zZasNDRPcSb7dQbQW6oyWtDj1XagT3vq-W5OlqT_WYqtH35xHo0EZMDaxlHv_X8XsxZmiDbzK3Ry_CFIyyAMgjGOyMT_DEMW455P_H_P-8rtBxkV93zRwCSE",
    author: {
      name: "Jane Smith"
    },
    featured: false,
    content: `<p>A mother should never have to choose between putting food on the table and sending her child to school. Yet, for many widows, school tuition is a barrier they cannot cross.</p>
    <p>Through the YOKM Educational Scholarship program, we sponsor full academic tuition, textbooks, backpacks, and uniforms for orphan children of widows. This year alone, we sponsored 120 students across elementary and high schools.</p>
    <p>We believe that education is the ultimate tool for long-term community transformation. By lifting the burden of school fees from widows' shoulders, we enable them to focus on stabilizing their families while ensuring their children have access to a bright future.</p>`
  }
];

export const CAMPAIGN_INFO = {
  title: "Feed 2,000 Widows 2025",
  initiative: "Annual Empowerment Initiative",
  percentComplete: 65,
  raised: 3250000,
  goal: 5000000,
};

export const BANK_DETAILS = {
  bankName: "First City Monument Bank (FCMB)",
  accountNumber: "5627510010",
  accountName: "Yendel Ocha Kpeling Ministry",
  referenceNote: "Please use your name as a reference for us to acknowledge your kindness.",
};

export const RECENT_DONATIONS: Donation[] = [
  {
    id: "d1",
    donorName: "Anonymous",
    amount: 10000,
    currency: "₦",
    campaign: "Feed 2,000 Widows 2025",
    timestamp: "Just now",
  },
  {
    id: "d2",
    donorName: "Samuel M.",
    amount: 25000,
    currency: "₦",
    campaign: "General Donation",
    timestamp: "2 hours ago",
  },
  {
    id: "d3",
    donorName: "Anonymous Member",
    amount: 250, // conversion or local simulation
    currency: "$",
    campaign: "Education Fund",
    timestamp: "1 day ago",
  },
  {
    id: "d4",
    donorName: "Robert King",
    amount: 50,
    currency: "$",
    campaign: "General Fund",
    timestamp: "2 days ago",
  }
];
