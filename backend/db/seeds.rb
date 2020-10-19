Character.destroy_all
User.destroy_all
Card.destroy_all

c1 = Character.create(name: "Test", img1: "https://miro.medium.com/max/512/1*nZ9VwHTLxAfNCuCjYAkajg.png")
c2 = Character.create(name: "Test2", img1: "https://svg-clipart.com/thumbs/blue/x0UljMr-blue-dot-clipart.jpg")
fruit_test = Character.(name: "Test3", img1: "fruit/kiwi.png")
u1 = User.create(name: "user1", character_id: c1.id)

banana = Card.create(img1: 'fruit/banana.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png' )
cherry = Card.create(img1: 'fruit/cherry.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
kiwi = Card.create(img1: 'fruit/kiwi.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
moreGrapes = Card.create(img1: 'fruit/moreGrapes.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
orange = Card.create(img1: 'fruit/orange.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
pineapple = Card.create(img1: 'fruit/Pineapple.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
strawberry = Card.create(img1: 'fruit/strawberry.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
threeGrapes = Card.create(img1: 'fruit/threeGrapes.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')
watermelon = Card.create(img1: 'fruit/watermelon.png', img2: 'https://www.pngkey.com/png/detail/168-1684674_super-mario-question-mark-clipart-super-mario-bros.png')


puts "Success"

