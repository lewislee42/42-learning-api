export async function getAccessToken() {
	const uid = process.env.UID;
  	const secret = process.env.SECRET;
	const url = 'https://api.intra.42.fr/v2/oauth/token'
	console.log(uid, secret)
	const res = await fetch(`${url}?client_id=${uid}&client_secret=${secret}&grant_type=client_credentials`, {
		method: 'POST',
		cache: 'no-store',
	})
	let resJSON = await res.json()
	return resJSON.access_token
}

export async function getAll42Login() {
	const accessToken = await getAccessToken()
	let arr = []
	let page = 1
	
	while (true) {
		let res = await fetch(`https://api.intra.42.fr/v2/campus/34/users?access_token=${accessToken}&page[size]=100&page[number]=${page}&filter[staff?]=false`)
	
		if (res.ok) {
		  	let resJson = await res.json()
		  	if (resJson.length === 0) {
				break;
		  	}
			resJson.forEach((student) => {
			  	if (student.email && student.email.endsWith('42kl.edu.my')) {
				  	arr.push(student.login)
			  	}
			})
		}
		page++
	}
	console.log(arr)
	return arr
}
