

export async function signupService(data: any) {
	return {
		"status": "success",
		"code": 200,
		"message": "User information retrieved successfully",
		"data": {
			"nickname": "JohnDoe",
			"avatar": "https://example.com/avatar.jpg"
		}
	}
}

export async function loginService(data: any) {
	return {
		"status": "success",
		"code": 200,
		"message": "User information retrieved successfully",
		"data": {
			"nickname": "JohnDoe",
			"avatar": "https://example.com/avatar.jpg"
		}
	}
}
