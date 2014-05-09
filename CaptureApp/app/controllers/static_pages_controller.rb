class StaticPagesController < ApplicationController
	before_action :logged_in

	def home
	end

	def logged_in
		if current_user == nil
			redirect_to new_user_session_path
		end
	end
end
