<template>
  <main class="main container mx-auto  px-4 sm:px-6 lg:px-8">
    <div class="main-item flex justify-center  mx-auto max-w-6xl py-5  items-center ">
      <div class=" basis-85 avatar w-xl ">
        <img src="../assets/images/notBg.png" alt="Image" class="  bg-gray-100 rounded-full ">
      </div>
      <div class="block-title-social ms-10 text-center ">
        <article class="text-wrap">
          <p class="text-xl">Привет!</p>
          <p class="font-bold text-4xl  pb-4 text-neutral-800">
            Меня зовут Бобур
          </p>
          <p class="font-bold text-2xl  text-neutral-500">Я Fullstack-разработчик</p>
        </article>
        <div class="buttons mt-16">
          <a href="https://tyumen.hh.ru/resume/84f5aebeff077251230039ed1f416237696f47"
            class="border-2 border-neutral-800 rounded-full px-6 py-3  hover:bg-neutral-800  hover:text-white"
            target="_blank">
            Резюме
          </a>
        </div>
      </div>
    </div>
  </main>
  <section class="mx-auto max-w-6xl mt-12">
    <article class="text-center p-4">
      <h2 class="text-3xl font-bold pb-5">Обо мне</h2>
      <p class="text-wrap text-lg text-neutral-700 ">
        Я занимаюсь программированием . Работаю как фронтенд- и бэкенд-разработчиком.
        Создаю современные и адаптивные веб-приложения, используя современные технологии и инструменты.
        Постоянно учусь новому и совершенствую свои навыки.
      </p>
    </article>
    <h1 class="text-3xl text-center py-5 font-bold">Мои навыки</h1>
    <div class="experience-block   flex justify-center gap-8 my-5">
      <div class=" border-2 grid grid-cols-2 gap-4 basis-130 rounded-xl p-8">
        <h1 class="col-span-2 text-center text-3xl font-bold  text-neutral-500">Frontend</h1>

        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>HTML</b>
        </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>CSS</b>
        </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>SASS</b>
        </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>TailwindCss</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>Bootstrap5</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>JavaScript</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>Vue.js</b>
        </span>
      </div>

      <div class="border-2 grid grid-cols-2 gap-4 basis-130 rounded-xl p-8">
        <h1 class="col-span-2 text-center text-3xl font-bold  text-neutral-500">Backend</h1>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>Node.js</b>
        </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>Express.js</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset=""> <b>MongoDb</b>
        </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>PostgreSQL</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>PHP</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>REST API</b> </span>
        <span><img src="../assets/images/icons/checkmark.png" class="w-7 inline-block" alt="" srcset="">
          <b>JWT</b> </span>
      </div>
    </div>
    <h1 class="text-3xl text-center py-5 font-bold">Мои контакты</h1>
    <div class="experience-block   flex justify-center gap-8 my-5">
      <div class="border-2 basis-130 rounded-xl p-8">
        <ul class="links-social-media  ms-8 flex justify-center gap-8 ">
          <li class="w-10 h-7">
            <a href="https://t.me/ergashzoda" target="_blank" rel="noopener noreferrer">
              <img src="../assets/images/icons/telegram.png" alt="Telegram">
            </a>
          </li>
          <li class="w-10 h-7">
            <a href="https://vk.com/id505453899" target="_blank" rel="noopener noreferrer">
              <img src="../assets/images/icons/vk.png" alt="VK">
            </a>
          </li>
          <li class="w-10 h-7">
            <a href="https://github.com/Boburbek99" target="_blank" rel="noopener noreferrer">
              <img src="../assets/images/icons/github.png" alt="GitHub">
            </a>
          </li>
          <li class="w-10 h-7">
            <a href="mailto:boburbek_99bk@mail.ru" target="_blank" rel="noopener noreferrer">
              <img src="../assets/images/icons/arroba.png" alt="Email">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style>
.skill-item {
  margin-bottom: 1.5rem;
}
</style>