'use client'

export default function LocaleToggle({locale}:{locale: 'en'|'fr'}) {
    return (
      <div className="flex gap-1">
        <button
          onClick={() => {
            document.location.href = '/fr'
          }}
          className={`px-1 py-1 font-medium uppercase text-lg transition-colors ${locale === "fr" ? "bg-white text-black" : "bg-transparent text-black hover:opacity-70"
            }`}
        >
          FR
        </button>
        <button
          onClick={() => {
            document.location.href = '/en'
          }}
          className={`px-1 py-1 font-medium uppercase text-lg transition-colors ${locale === "en" ? "bg-white text-black" : "bg-transparent text-black hover:opacity-70"
            }`}
        >
          EN
        </button>
      </div>
    )
}