class User < ApplicationRecord
    has_many :rounds
    belongs_to :character
end
