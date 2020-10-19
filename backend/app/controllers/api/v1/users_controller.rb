class Api::V1::UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def create
        @newUser = User.create(userParams)
          render json: @newUser
        # @newUser = User.create!(userParams)
        # json_response(@newUser, :created)
    end
    

    private

    def userParams
        params.require(:user).permit(:name, :character_id)
    end
end
