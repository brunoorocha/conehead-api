import express from 'express'

const notificationRoutes = express.Router()
notificationRoutes.get('/notifications', (_, res) => {
  return res.json({
    notifications: [
      { emoji: '🚨', message: 'O molho de tomate está quase vencendo.', type: 'alert' },
      { emoji: '⚠️', message: 'Você está quase sem pão bola.', type: 'warning' },
      { emoji: '🎅🏻', message: 'Jingle Bell! O Natal está chegando. Que tal revisar o estoque para ver se é necessário repor alguns items e atender os seus clientes sem surpresas.', type: 'normal' }
    ]
  })
})

export default notificationRoutes
