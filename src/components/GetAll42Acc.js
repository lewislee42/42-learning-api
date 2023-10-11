import { getAll42Login } from "../pages/api/utils";
import { useState, useEffect } from "react";
import Image from 'next/image'

export default function GetAll42Acc() {
	const [ accounts, setAccounts ] = useState([])
	
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const data = await getAll42Login();
			setAccounts(data);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchData();
	}, [])
	useEffect(() => {
		console.log(accounts)
	}, [accounts])
	return (
		<section className='flex flex-wrap'>
			{accounts.map((user) => (
				<Image key={user.id} src={user.image} width={100} height={100} />
			))}
		</section>
	)
}