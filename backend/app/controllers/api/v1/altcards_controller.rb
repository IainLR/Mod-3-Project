class Api::V1::AltcardsController < ApplicationController

    def index
        cards = Altcard.all
        render json: cards
    end

    def show
        card = Altcard.find(params[:id])
        render json: card
    end
    
end
