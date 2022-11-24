require('bootstrap/js/dist/collapse')
import AOS from './libs/aos'
import aosConfig from './modules/aosConfig'

const id = document.getElementsByTagName('main')[0].getAttribute('id')

addEventListener('DOMContentLoaded', async () => {
	AOS.init(aosConfig)
})

switch (id) {
  case 'main-page':
    require('./modules/index')
    break
  case 'new-smm':
    require('./modules/pageHeight')
    require('./modules/new-smm/header')
    require('./modules/new-smm/main')
    break
  case 'personal-brand-page':
    require('./modules/brand/functions')
    require('./modules/brand/main')
    break
}
