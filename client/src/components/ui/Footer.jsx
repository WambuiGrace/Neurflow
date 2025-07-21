"use client"

import { Brain, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "Integrations", href: "#integrations" },
            { name: "API", href: "#api" },
        ],
        company: [
            { name: "About", href: "#about" },
            { name: "Blog", href: "#blog" },
            { name: "Careers", href: "#careers" },
            { name: "Press", href: "#press" },
        ],
        resources: [
            { name: "Documentation", href: "#docs" },
            { name: "Help Center", href: "#help" },
            { name: "Community", href: "#community" },
            { name: "Status", href: "#status" },
        ],
        legal: [
            { name: "Privacy", href: "#privacy" },
            { name: "Terms", href: "#terms" },
            { name: "Security", href: "#security" },
            { name: "Cookies", href: "#cookies" },
        ],
    }

    const socialLinks = [
        { name: "GitHub", icon: Github, href: "#github" },
        { name: "Twitter", icon: Twitter, href: "#twitter" },
        { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
        { name: "Email", icon: Mail, href: "mailto:hello@neuroflow.com" },
    ]

    return (
        <footer className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Brain className="w-8 h-8 text-indigo-600" />
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">Neuroflow</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm">
                            Intelligent project management platform that helps teams collaborate, track progress, and achieve their
                            goals faster.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
                    <div className="max-w-md">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Stay updated</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Get the latest updates and tips delivered to your inbox.
                        </p>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
                        <span>© {currentYear} Neuroflow. Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>for productive teams.</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                        <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Sign In
                        </Link>
                        <Link to="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
