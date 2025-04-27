<script lang="ts">
    function playSound(filename: string) {
        const audio = new Audio(`/sounds/${filename}.mp3`);
        audio.play();
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-200">
    <div class="w-full max-w-xs bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Vibeboard 😎</h1>

        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('gehaald')}>gehaald</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('plopperdeplop')}>Plopperdeplop</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('hallowki')}>hallowki</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('toenplots')}>toenplots</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('luiheeftaids')}>luiheeftaids</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('ikrookeenpijp')}>rookeenpijp</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('eruit')}>eruit</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('behalvelui')}>behalvelui</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('dommerik')}>dommerik</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('seksmetsmal')}>seksmetsmal</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('klus!')}>klus!</button>
            <button class="bg-red-500 text-white p-4 rounded-md mb-4 shadow-lg active:bg-red-700" onclick={() => playSound('geenaids')}>geenaids</button>
        </div>
    </div>
</div>