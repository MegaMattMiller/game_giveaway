<template>
  <div>{{ data.title }}</div>
</template>

<script setup lang="ts">
import type { GameData } from '@/types';

defineProps<{
  data: GameData;
}>();
</script>
