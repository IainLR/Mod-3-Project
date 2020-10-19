Character.destroy_all
User.destroy_all

c1 = Character.create(name: "Test", img1: "https://miro.medium.com/max/512/1*nZ9VwHTLxAfNCuCjYAkajg.png")
c2 = Character.create(name: "Test2", img1: "https://svg-clipart.com/thumbs/blue/x0UljMr-blue-dot-clipart.jpg")

u1 = User.create(name: "user1", character_id: c1.id)


puts "Success"

