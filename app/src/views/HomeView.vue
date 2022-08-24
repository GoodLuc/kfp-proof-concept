<script setup>
import { ref } from "vue";
import MapView from "@/components/MapView.vue";
import PostService from "@/PostService";

let currentView = ref("area_p_9");
let requestStreet = ref("");
let requestEmail = ref("");
let submitButtonMsg = ref("Submit request");
let submitButtonDisable = ref(false);
let submitFormEnable = ref(true);
let submissionSuccess = ref(false);

const dataViews = {
  area_p_9: { label: "Sidewalk area at 9am" },
  area_p_19: { label: "Sidewalk area at 7pm" },
  area_p_12: { label: "Sidewalk area at 12pm" },
};

const submitApplication = async () => {
  submitButtonMsg.value = "Sending application...";
  submitButtonDisable.value = true;
  console.log("submitApplication");
  try {
    await PostService.sendPermitApplication({ email: requestEmail.value, street: requestStreet.value, timeOfDay: dataViews[currentView.value].label });
    submitFormEnable.value = false;
    submissionSuccess.value = true;
  } catch (error) {
    console.log("Error", error);
  }
};
</script>

<template>
  <main class="main-content">
    <div class="flex">
      <article class="selector">
        <h2>State resolution regarding the use of public space for film production activities</h2>
        <p>When submiting your Permit Request, sidewalk availability must be taken into account. This is based on the busyness of a given street during different times of the day.</p>
        <p>Use the map widget to visualize available street space based on time of day.</p>
        <div class="controller flex column">
          <div class="flex align-center justify-between">
            <p>Select time of day:</p>
            <div>
              <el-button :type="currentView === 'area_p_9' ? 'primary' : null" @click="currentView !== 'area_p_9' ? (currentView = 'area_p_9') : null" plain>9 am</el-button>
              <el-button :type="currentView === 'area_p_12' ? 'primary' : null" @click="currentView !== 'area_p_12' ? (currentView = 'area_p_12') : null" plain>12 pm</el-button>
              <el-button :type="currentView === 'area_p_19' ? 'primary' : null" @click="currentView !== 'area_p_19' ? (currentView = 'area_p_19') : null" plain>7 pm</el-button>
            </div>
          </div>
          <p>Only <strong>green designated</strong> street areas will be approved.</p>
        </div>
        <div v-if="submitFormEnable" class="controller flex column request">
          <h3>Enter the desired street and your email to submit your permit request</h3>
          <p>Requested street:</p>
          <el-input v-model="requestStreet" placeholder="Name street and define intersections" />
          <p>Your email:</p>
          <el-input v-model="requestEmail" placeholder="yourname@example.com" />
          <el-button size="large" class="submit" :type="!submitButtonDisable ? 'primary' : null" @click="submitApplication()" :disabled="submitButtonDisable">{{ submitButtonMsg }}</el-button>
        </div>

        <div v-if="submissionSuccess" class="controller flex column request">
          <h3>
            Your request for filming at <strong>{{ requestStreet }}</strong> has been sent.
          </h3>
          <p>
            We will review your application and inform you of next steps at your email <strong>{{ requestEmail }}</strong
            >.
          </p>
          <div class="flex">
            <el-button
              @click="
                submissionSuccess = false;
                submitFormEnable = true;
                submitButtonDisable = false;
                requestStreet = '';
              "
              >Submit a new request</el-button
            >
            <el-button @click="$router.push('/submissions')">View application submissions</el-button>
          </div>
        </div>
      </article>
      <MapView :dataField="currentView" />
    </div>
  </main>
</template>

<style lang="scss">
.selector {
  width: 40%;
  min-width: 300px;
  background: #f2f2f2;
  padding: 2rem;
  h2,
  h3 {
    margin-top: 0;
  }
  h3 {
    margin-bottom: 0;
  }
  .controller {
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    background: white;
    padding: 1rem;
  }
  .request p {
    margin-bottom: 0.5rem;
  }
  .submit {
    margin: 1rem 0;
  }
}
</style>
