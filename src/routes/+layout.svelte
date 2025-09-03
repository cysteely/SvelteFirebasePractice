<script>
	import {onMount} from 'svelte'; //onpageload
    import { auth, db } from "../lib/firebase/firebase";
    import { getDoc, doc, setDoc } from 'firebase/firestore';
	import { authStore } from '../store/store';

	const nonAuthRoutes = ['/']

	onMount(()=>{
		console.log('Mounting');

		const unsubscribe = auth.onAuthStateChanged(async user => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)){ //if trying to access protected route 
				window.location.href = '/';
				return
			}

			if (user && currentPath==='/'){
				window.location.href = '/dashboard';
				return
			}

			if(!user){
				return;
			}

			let dataToSetToStore

			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if(!docSnap.exists()){
				const userRef = doc(db, 'user', user.uid);
				dataToSetToStore = {
					email: user.email, 
					todos:[]
				}
				await setDoc(
					userRef,
					dataToSetToStore,
					{merge: true} //merge existing with new - no overwriting 
				);
			}else{
				const user_data = docSnap.data()
				dataToSetToStore = user_data
			}
			authStore.update(curr => {
				return{
					...curr,
					user,
					dataToSetToStore,
					loading: false //page loading finished
				}
			})
		});
	});
</script>

<div class="mainContainer">
	<slot/>
</div>

<style>
    .mainContainer {
		min-height: 100vh;
		background: linear-gradient(to right, #000428, #000046);
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
    }
</style>