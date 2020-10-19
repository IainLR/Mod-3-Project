class User < ApplicationRecord
    has_many :games
    has_many :rounds, through: :games
    belongs_to :character
end
