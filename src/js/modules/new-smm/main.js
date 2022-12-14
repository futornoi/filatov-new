import swipers from './swiper'
import threeModel from './three'

import preloaderDesk from '../../../assets/images/new-smm/preloader-desk.gif'
import preloaderMob from '../../../assets/images/new-smm/preloader-mob.gif'

const getModal = name => {
  return document?.querySelector(`[data-modal=${name}]`)
}

const setModalState = (btn, menu, activate) => {
  const action = activate ? 'add' : 'remove'

  btn?.classList[action]('open')
  menu?.classList[action]('active')
}

const goTo = sectionId => {
  const top = document.getElementById(sectionId)?.offsetTop
  window?.scrollTo({
    top,
    behavior: 'smooth',
  })
}

addEventListener('DOMContentLoaded', async () => {
  // buttons
  const burgerBtn = document.querySelector('[data-burger-btn]')
  const reserveButtons = document.querySelectorAll('[data-reserve-btn]')
  const forWhomSlideNavigation = document.querySelectorAll('[data-forWhom-slide]')

  // redirect links
  const scrollLinks = document.querySelectorAll('[data-scroll-to]')

  // modals
  const burgerMenu = getModal('menu')
  const reserveModal = getModal('reserve')

  burgerBtn?.addEventListener('click', ({ currentTarget }) => {
    const isActiveMenu = currentTarget.classList.contains('open')

    if (isActiveMenu) {
      setModalState(currentTarget, burgerMenu, false)
      setModalState(currentTarget, reserveModal, false)
    } else {
      setModalState(currentTarget, burgerMenu, true)
    }
  })

  reserveButtons.forEach(reserveBtn => {
    reserveBtn.addEventListener('click', _ => {
      setModalState(burgerBtn, reserveModal, true)
    })
  })

  burgerMenu?.addEventListener('click', ({ target, currentTarget }) => {
    const parent = target.closest('.menu__sidebar_wrapper')
    if (!parent) {
      setModalState(burgerBtn, currentTarget, false)
    }
  })

  scrollLinks.forEach(link => {
    link.addEventListener('click', ({ currentTarget }) => {
      const sectionId = currentTarget.getAttribute('data-scroll-to').replace('#', '')
      setModalState(burgerBtn, burgerMenu, false)
      goTo(sectionId)
    })
  })

  // three js
  const { rotateRight, rotateLeft } = await threeModel.init()

  // sliders
  const swiper = swipers.forWhomSwiper()
  swipers.speakersSwiper()
  swipers.communitySwiper()

  forWhomSlideNavigation.forEach(btn => {
    btn.addEventListener('click', ({ currentTarget }) => {
      const isNext = currentTarget.getAttribute('data-forWhom-slide') === 'next'
      if (isNext) {
        rotateRight()
      } else {
        rotateLeft()
      }
    })
  })

  swiper.on('touchEnd', e => {
    if (e.swipeDirection === 'prev') {
      rotateRight()
    }
    if (e.swipeDirection === 'next') {
      rotateLeft()
    }
  })

  const resultContainer = document.getElementById('result')

  let index = 1
  const resultTitles = ['????????????', '??????????????????', '????????????????????????????']
  const resultDescriptions = [
    '???? ?????????? seniour.',
    '???????? ?????????????? ???????????? ???? ???????????????? ???????????? ?????? ?????? ??????????.',
    '???????????? ?????? ?????????????????? ??????, ?????? ???? ???????????????? ?? ?????????????????? ???? ???? ????????????????.',
  ]

  resultContainer.addEventListener('click', ({ currentTarget }) => {
    const hide = [{ opacity: '1' }, { opacity: '0' }]
    const show = [{ opacity: '0' }, { opacity: '1' }]
    const timing = {
      duration: 450,
      iterations: 1,
    }

    const content = currentTarget.querySelector('.result__content')
    const circles = currentTarget.querySelector('.bg-circles').children
    const title = currentTarget.querySelector('h3.result__main-title')
    const desc = currentTarget.querySelector('p.result__desk')
    index++
    ;[...circles].forEach((circle, idx, array) => {
      circle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)' },
          { transform: `translate(-50%, -50%) scale(${1 + (array.length - idx) * 0.03})` },
          { transform: 'translate(-50%, -50%) scale(1)' },
        ],
        {
          duration: (array.length - idx) * 100 + 250,
          iterations: 1,
          delay: idx * 200,
        },
      )
    })

    const player = content.animate(hide, timing)
    player.onfinish = () => {
      desc.innerText = resultDescriptions[index % 3]
      title.innerText = resultTitles[index % 3]
      content.animate(show, timing)
    }
  })

  // Preloader
  const html = document.getElementsByTagName('html')[0]
  const smmPreloader = document.querySelectorAll('.smm-preloader')[0]
  const videContainer = smmPreloader.querySelector('.smm-preloader__video')
  const imgDesktop = document.createElement('img')
  const imgMobile = document.createElement('img')

  imgDesktop.setAttribute('src', preloaderDesk)
  imgDesktop.classList.add('smm-preloader__desktop')
  videContainer.appendChild(imgDesktop)

  imgMobile.setAttribute('src', preloaderMob)
  imgMobile.classList.add('smm-preloader__mobile')
  videContainer.appendChild(imgMobile)

  setTimeout(() => {
    html.style.overflow = 'auto'
    smmPreloader.classList.add('hide')
    imgDesktop.remove()
    imgMobile.remove()
    smmPreloader.remove()
  }, 4000)
})
