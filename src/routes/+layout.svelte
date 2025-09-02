<script>
	import {onMount} from 'svelte'; //onpageload
    import { auth, db } from "../lib/firebase/firebase";

	const nonAuthRoutes = ['/']

	onMount(()=>{
		console.log('Mounting');

		const unsubscribe = auth.onAuthStateChanged(async user => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)){ //if trying to access protected route 
				window.location.href = '/';
				return
			}
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