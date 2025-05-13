/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff', // Bleu doux
          light: '#e7f1ff',   // Fond bleu clair
          dark: '#0056b3',    // Bleu foncé
          foreground: '#ffffff',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        border: '#e5e7eb',
        background: '#f9fafc',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1f2937',
        },
        accent: {
          DEFAULT: '#ffe9c9',
          foreground: '#7c4a03',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        ring: '#3b82f6',
        input: '#f3f4f6',
      },
      borderRadius: {
        lg: '1rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: '#007bff', // Bleu doux
			light: '#e7f1ff',   // Fond bleu clair
			dark: '#0056b3',    // Bleu foncé
			foreground: '#ffffff',
		  },
		  gray: {
			50: '#f9fafb',
			100: '#f3f4f6',
			200: '#e5e7eb',
			300: '#d1d5db',
			400: '#9ca3af',
			500: '#6b7280',
			600: '#4b5563',
			700: '#374151',
			800: '#1f2937',
			900: '#111827',
		  },
		  border: '#e5e7eb',
		  background: '#f9fafc',
		  card: {
			DEFAULT: '#ffffff',
			foreground: '#1f2937',
		  },
		  accent: {
			DEFAULT: '#ffe9c9',
			foreground: '#7c4a03',
		  },
		  destructive: {
			DEFAULT: '#dc2626',
			foreground: '#ffffff',
		  },
		  ring: '#3b82f6',
		  input: '#f3f4f6',
		},
		borderRadius: {
		  lg: '1rem',
		  md: '0.5rem',
		  sm: '0.25rem',
		},
		fontFamily: {
		  sans: ['Inter', 'sans-serif'],
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"),
	],
  };
  