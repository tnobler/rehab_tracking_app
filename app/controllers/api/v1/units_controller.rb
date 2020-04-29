class Api::V1::UnitsController < ApplicationController
  def index
    unit = Unit.all.order(number: :asc)
    render json: unit
  end

  def create
    unit = Unit.create!(unit_params)
    if unit
      render json: unit
    else
      render json: unit.errors
    end
  end

  def show
    if unit
      render json: unit
    else
      render json: unit.errors
    end
  end

  def destroy
    unit&.destroy
    render json: { message: 'Unit deleted!' }
  end

  private

  def unit_params
    params.permit(:number, :floor_plan, :square_footage, :budgeted_rehab_amount, :rehab_status)
  end

  def unit
    @unit ||= Unit.find(params[:id])
  end
end
