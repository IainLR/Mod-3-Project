class Api::V1::OthersController < ApplicationController

    def index
        cards = Other.all
        render json: cards
    end

    def show
        card = Other.find(params[:id])
        render json: card
    end
end
