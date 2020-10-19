Character.destroy_all
User.destroy_all

c1 = Character.create(name: "Test", img1: "image-url")

u1 = User.create(name: "user1", character_id: c1.id)


puts "Success"

