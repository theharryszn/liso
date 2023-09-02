<script setup lang="ts">
import { onMounted } from 'vue'
import RepeatTextScroll from '../animations/RepeatTextScroll'

onMounted(() => {
  const els = document.querySelectorAll('.c-heading__text')
  els.forEach((el) => {
    new RepeatTextScroll(el as HTMLElement)
  })
})
</script>

<template>
  <main>
    <nav class="c-navbar">
      <div class="c-navbar__logo">Liso</div>
      <div class="c-navbar__links">
        <RouterLink to="/about">ABOUT</RouterLink>
        <RouterLink to="/credits">CREDITS</RouterLink>
      </div>
    </nav>
    <header class="c-heading">
      <div class="c-heading__text" data-direction="forward">FADED</div>
      <!-- <div class="c-author">By Harry</div> -->
      <div class="c-heading__desc">
        Text animations in web design can elevate your content, making it more engaging and
        memorable. JavaScript, coupled with the GreenSock Animation Platform (GSAP), empowers you to
        create mesmerizing text animations that captivate your audience.

        <br />
        <br />
        <br />

        JavaScript, the language of the web, combined with GSAP, unlocks the potential for
        enchanting text animations. In this article, we'll explore the art of crafting seamless and
        beautiful text animations using these powerful tools.
      </div>
      <div class="c-heading__text c-heading__text--outline">SMOOTH</div>
      <div class="c-heading__desc">
        At the heart of our text animation adventure lies the RepeatTextScroll class—a masterpiece
        of web animation. This class seamlessly combines JavaScript and GSAP to create captivating
        text animations. It works its magic through a series of carefully crafted methods.

        <br />
        <br />
        <br />

        The createFades() method conjures fading text elements, each with a unique position. These
        elements artfully stack upon each other, resulting in a captivating fading effect. It's like
        composing a symphony of words that unfold gracefully as you scroll.
      </div>
      <div class="c-heading__text c-heading__text--faded-transparent" data-direction="backwards">
        MAGIC SCROLL
      </div>
      <div class="c-heading__desc">
        Using GSAP's timeline capabilities, the createScrollTimeline() method orchestrates the
        fading text elements. They seamlessly transition as users scroll, creating a visual symphony
        that enchants the eyes and minds of your website's visitors.

        <br />
        <br />
        <br />

        The createObserver() method employs the Intersection Observer API to initiate the animation
        precisely when the text enters the viewport. This adds a touch of magic to your website.
        Your content comes to life as it enters the spotlight, enhancing both performance and the
        user experience.

        <br />
        <br />
        <br />

        Our class doesn't just stop at animation; it's designed to adapt gracefully to various
        screen sizes. This makes it an ideal addition to responsive web design. Your text animations
        will look stunning on any device, from smartphones to desktops.
      </div>
      <div
        class="c-heading__text c-heading__text--faded-transparent"
        data-direction="backwards"
        data-paused
        data-paused-threshold="0.2"
      >
        animated
      </div>
      <div class="c-heading__desc">
        The convergence of these techniques results in a harmonious blend of text and animation. As
        users scroll down the page, the text gracefully dances into view, creating a dynamic and
        immersive storytelling experience. It's like a captivating ballet of content and animation.

        <br /><br /><br />
        Implementing this animation on your own website is a breeze. Just include the necessary
        JavaScript libraries, ensuring GSAP is integrated into your project. Create an instance of
        the RepeatTextScroll class, specifying the HTML element you wish to animate. Then, let the
        magic happen as visitors scroll through your website.

        <br /><br /><br />

        Animations aren't mere embellishments; they are potent tools for enhancing user engagement.
        By harnessing the capabilities of JavaScript and GSAP, you can create animations that
        captivate your audience and breathe life into your content. Elevate your website's
        storytelling with the art of text animations—it's a journey worth embarking on for both you
        and your users.
      </div>
    </header>
  </main>
</template>
