// SEO utility functions
// TODO: Implement these for better SEO

export const updatePageMeta = (title, description, keywords = [], ogImage = null) => {
  // Update page title
  document.title = title ? `${title} | Neuroflow` : "Neuroflow - Intelligent Project Management"

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute("content", description)
  } else {
    const meta = document.createElement("meta")
    meta.name = "description"
    meta.content = description
    document.head.appendChild(meta)
  }

  // Update meta keywords
  if (keywords.length > 0) {
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords.join(", "))
    } else {
      const meta = document.createElement("meta")
      meta.name = "keywords"
      meta.content = keywords.join(", ")
      document.head.appendChild(meta)
    }
  }

  // Update Open Graph tags
  updateOpenGraphTags(title, description, ogImage)

  // Update Twitter Card tags
  updateTwitterCardTags(title, description, ogImage)
}

const updateOpenGraphTags = (title, description, image) => {
  const ogTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: window.location.href },
    { property: "og:site_name", content: "Neuroflow" },
  ]

  if (image) {
    ogTags.push({ property: "og:image", content: image })
  }

  ogTags.forEach((tag) => {
    let meta = document.querySelector(`meta[property="${tag.property}"]`)
    if (meta) {
      meta.setAttribute("content", tag.content)
    } else {
      meta = document.createElement("meta")
      meta.setAttribute("property", tag.property)
      meta.setAttribute("content", tag.content)
      document.head.appendChild(meta)
    }
  })
}

const updateTwitterCardTags = (title, description, image) => {
  const twitterTags = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:site", content: "@neuroflow" },
  ]

  if (image) {
    twitterTags.push({ name: "twitter:image", content: image })
  }

  twitterTags.forEach((tag) => {
    let meta = document.querySelector(`meta[name="${tag.name}"]`)
    if (meta) {
      meta.setAttribute("content", tag.content)
    } else {
      meta = document.createElement("meta")
      meta.setAttribute("name", tag.name)
      meta.setAttribute("content", tag.content)
      document.head.appendChild(meta)
    }
  })
}

// Page-specific SEO configurations
export const seoConfig = {
  home: {
    title: "Intelligent Project Management Platform",
    description:
      "Experience the future of team collaboration with Neuroflow's intelligent project management platform. Streamline workflows, boost productivity, and achieve your goals faster.",
    keywords: ["project management", "team collaboration", "productivity", "task management", "workflow automation"],
  },
  login: {
    title: "Sign In",
    description: "Sign in to your Neuroflow account and access your projects, teams, and tasks.",
    keywords: ["login", "sign in", "authentication"],
  },
  signup: {
    title: "Create Account",
    description:
      "Join thousands of teams using Neuroflow for intelligent project management. Create your free account today.",
    keywords: ["signup", "register", "create account", "free trial"],
  },
  dashboard: {
    title: "Dashboard",
    description: "Your project management dashboard. Track progress, manage tasks, and collaborate with your team.",
    keywords: ["dashboard", "overview", "projects", "tasks"],
  },
  projects: {
    title: "Projects",
    description: "Manage your projects with Kanban boards, task tracking, and team collaboration tools.",
    keywords: ["projects", "kanban", "task management", "project tracking"],
  },
  teams: {
    title: "Teams",
    description: "Manage your teams, invite members, and collaborate effectively on projects.",
    keywords: ["teams", "collaboration", "team management", "members"],
  },
}
