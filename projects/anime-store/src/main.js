import './style.css'

document.querySelector('#app').innerHTML = `
  <!-- NAVBAR -->
  <nav class="bg-[#181818] text-white border-b border-[#303030]">

  <div class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

    <!-- LOGO -->
    <a href="#" class="flex flex-col leading-none">
  <span class="text-2xl font-bold text-white">
    OTAKU
  </span>
  <span class="text-2xl font-bold text-red-500">
    VAULT
  </span>
</a>

    <!-- NAVIGATION -->
    <div class="flex items-center gap-10">

      <a href="#" class="text-base font-medium hover:text-red-500 transition">
        Home
      </a>

      <a href="#" class="text-base font-medium hover:text-red-500 transition">
        Shop
      </a>

      <a href="#" class="text-base font-medium hover:text-red-500 transition">
        Collections
      </a>

      <a href="#" class="text-base font-medium hover:text-red-500 transition">
        New Arrivals
      </a>

      <a href="#" class="text-base font-medium hover:text-red-500 transition">
        About
      </a>

    </div>

    <!-- ICONS -->
    <div class="flex items-center gap-6 text-2xl">

      <button class="hover:text-red-500 transition">
        ⌕
      </button>

      <button class="hover:text-red-500 transition">
        ♡
      </button>

      <button class="hover:text-red-500 transition">
        🛒
      </button>

    </div>

  </div>

</nav>


    <section class="relative bg-black text-white min-h-[80vh] overflow-hidden">

    <!-- HERO IMAGE -->
    <div class="absolute inset-0">
      <img
        src="/hero.png"
        alt="Anime figure"
        class="w-full h-full object-cover object-right"
      >

      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
    </div>


    <!-- HERO CONTENT -->
    <div class="relative max-w-7xl mx-auto px-6 py-16 min-h-[80vh] flex items-center">

      <div class="max-w-3xl">

        <p class="text-red-500 font-semibold tracking-widest mb-5">
          PREMIUM ANIME MERCHANDISE
        </p>

        <h1 class="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05]">
          THE WORLD OF ANIME,
          <span class="text-red-500">IN YOUR HANDS.</span>
        </h1>

        <p class="text-gray-400 text-lg md:text-xl mt-7 max-w-xl">
          Discover premium anime clothing, figures, collectibles
          and accessories made for true fans.
        </p>

        <div class="flex gap-4 mt-9">

          <a
            href="#"
            class="bg-red-500 hover:bg-red-600 px-7 py-3.5 rounded font-semibold transition"
          >
            Shop Now
          </a>

          <a
            href="#"
            class="border border-gray-700 hover:border-white px-7 py-3.5 rounded font-semibold transition"
          >
            Explore Collection
          </a>

        </div>

      </div>

    </div>

  </section>
`