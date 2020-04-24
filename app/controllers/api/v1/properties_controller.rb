class Api::V1::PropertiesController < ApplicationController
  def index
    property = Property.all.order(created_at: :desc)
    render json: property
  end

  def create
    property = Property.create!(property_params)
    if property
      render json: property
    else
      render json: property.errors
    end
  end

  def show
    if property
      render json: property
    else
      render json: property.errors
    end
  end

  def destroy
    property&.destroy
    render json: { message: 'Property deleted!' }
  end

  private

  def property_params
    params.permit(:name, :units, :description, :image)
  end

  def property
    @property ||= Property.find(params[:id])
  end
end
