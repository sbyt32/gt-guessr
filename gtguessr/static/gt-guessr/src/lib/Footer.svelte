<script lang="ts" context="module">
    export const creators = [
        {link: "https://twitter.com/SammyTheTanuki", user: "SammyTheTanuki"},
        {link: "https://twitter.com/Wynslow_", user: "Wynslow_"},
        {link: "https://twitter.com/ZenithO_o", user: "ZenithO_o"},
        ]
</script>

<div class="text-center text-black pb-2">
    <p class="text-sm">
    {#each creators as creator}
        <a href={creator.link} class="px-2">
        <i class="fa-brands fa-twitter"/>
        {creator.user}
        </a>
    {/each}
    </p>
</div>
