<script setup>
import { ref, onMounted } from "vue";
import PostService from "@/PostService";

let submissions = ref([]);

const fetchSubmissions = async () => {
  try {
    let response = await PostService.getAllPermitRequests();
    submissions.value = response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

onMounted(() => fetchSubmissions());
</script>

<script>
export default {
  name: "SubmissionRequests",
};
</script>

<template>
  <main class="main-content flex column">
    <h2>Recent Permit Request Applications</h2>
    <div v-if="submissions.length">
      <el-card class="permitCard" v-for="(submission, index) in submissions" shadow="hover" :key="index">
        <h3>{{ submission.requestedStreet }}</h3>
        <p>{{ submission.timeOfDay }}</p>
        <p>by {{ submission.email }}</p>
      </el-card>
    </div>
    <div v-else>
      <p>No submissions yet.</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-content {
  padding: 2rem;
  background: white;
  .permitCard {
    margin-bottom: 2rem;
    h3 {
      margin-top: 0;
    }
  }
}
</style>
