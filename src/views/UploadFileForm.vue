<template>
  <div class="class container">
    <b-row>
      <b-col cols="md-6">
        <b-card title="" header-tag="header" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Upload Single File</h6>
          </template>
          <b-form>
            <b-progress v-show="(progressFile > 0)" :value="progressFile" :max="100" show-progress animated></b-progress>
            <b-form-group label="File:" label-for="file">
              <b-form-file type="file" @change="selectFile($event)" ref="file" id="file" name="file" v-validate="'required'" :class="{ 'is-invalid': errors.has('file')}" ></b-form-file>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('file')">{{ errors.first('file') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
          <b-button @click="onSubmitSingleFile" variant="primary">Upload</b-button>
          <template #footer>
            <h6>Result: {{ messageResponseSingle }}</h6>
            <div v-if="(responseSingleForm.fileName != '')"> 
              <p>File Name : {{ responseSingleForm.fileName }}</p>
              <p>File Download URI : <a :href=responseSingleForm.fileDownloadUri target="_blank">{{ responseSingleForm.fileDownloadUri }}</a></p>
              <p>File Type : {{ responseSingleForm.fileType }}</p>
              <p>size : {{ responseSingleForm.size }}</p>
            </div>
          </template>
        </b-card>
      </b-col>
      <b-col cols="md-6">
        <b-card title="" header-tag="header" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Upload Multiple Files</h6>
          </template>
          <b-form>
            <b-progress v-show="(progressMultiFile > 0)" :value="progressMultiFile" :max="100" variant="warning" show-progress animated></b-progress>
            <b-form-group label="Files:" label-for="files">
              <b-form-file type="file" @change="selectMultiFiles" id="files" name="files" v-validate="'required'" :class="{ 'is-invalid': errors.has('files')}" multiple ></b-form-file>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('files')">{{ errors.first('files') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form>
          <b-button @click="onSubmitMultiFile" variant="primary">Upload</b-button>
          <template #footer>
            <h6>Result: {{ messageResponseMulti }}</h6>
            <div v-if="!!responseMultiForm">
              <div v-for="item in responseMultiForm" :key="item.fileName">
                <p>File Name : {{ item.fileName }}</p>
                <p>File Download URI : <a :href=item.fileDownloadUri target="_blank">{{ item.fileDownloadUri }}</a></p>
                <p>File Type : {{ item.fileType }}</p>
                <p>size : {{ item.size }}</p>
                <hr>
              </div>
            </div>
          </template>
        </b-card>
      </b-col>  
    </b-row>
  </div>
</template>

<script>
import UploadService from '../services/UploadService'
const uploadService = UploadService.build()
export default {
  name: 'uploadfiles',
  data() {
    return {
      messageResponseMulti: undefined,
      messageResponseSingle: undefined,
      responseSingleForm: {
        fileName: '',
        fileDownloadUri: '',
        fileType: '',
        size: 0
      },
      responseMultiForm: undefined,
      progressFile: 0,
      progressMultiFile: 0,
      selectedFile: undefined,
      selectedMultiFiles: undefined
    }
  },
  methods: {
    selectFile(e) {
      this.selectedFile = e.target.files
      console.log(this.selectedFile.item(0))
    },
    selectMultiFiles(e) {
      this.selectedMultiFiles = e.target.files
      console.log(this.selectedMultiFiles)
    },
    onSubmitSingleFile: async function() {
      const formData = new FormData()
      formData.append('file', this.selectedFile.item(0))
      return await uploadService.upload(formData).then(
        (response) => {
          console.log(response)
          this.messageResponseSingle = "File successfully uploaded"
          this.responseSingleForm.fileName = response.fileName
          this.responseSingleForm.fileDownloadUri = response.fileDownloadUri
          this.responseSingleForm.fileType = response.fileType
          this.responseSingleForm.size = response.size
        },
        err => {
          console.log(err)
          this.messageResponseSingle = err.message
        }
      )
    },
    onSubmitMultiFile: async function() {
      const formData = new FormData()
      for (var i = 0; i < this.selectedMultiFiles.length; i++) {
        formData.append('files', this.selectedMultiFiles.item(i))
      }

      return await uploadService.uploadMultipleFiles(formData).then(
        (response) => {
          console.log(response)
          this.messageResponseMulti = "All Files successfully uploaded"
          this.responseMultiForm = response
        },
        err => {
          console.log(err)
          this.messageResponseMulti = err.message
        }
      )
    }
  },
}
</script>

<style>

</style>