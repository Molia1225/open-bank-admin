<!-- 回访表单组件 -->
<template>
	<div class='visit-form'>
		<a-modal :visible="modalVisible"
						 :confirm-loading="confirmLoading"
						 :footer="null"
						 :maskClosable='false'
						 @ok="handleOk"
						 @cancel="handleCancel">
			<div class="form-content">
				<a-form-model :model="form"
											:label-col="labelCol"
											:wrapper-col="wrapperCol">
					<a-form-model-item label="手机号码">
						{{form.phone}}
					</a-form-model-item>
					<a-form-model-item label="姓名">
						{{form.name}}
					</a-form-model-item>
					<a-form-model-item label="银行卡预约信息">
						恒生银行，深圳，2020-01-01
					</a-form-model-item>
					<a-form-model-item label="回访结果">
						<a-radio-group v-model="form.visit_result"
													 button-style="solid">
							<a-radio-button value="1">
								未接通
							</a-radio-button>
							<a-radio-button value="2">
								无意向
							</a-radio-button>
							<a-radio-button value="3">
								有意向
							</a-radio-button>
							<a-radio-button value="4">
								已入金
							</a-radio-button>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="备注信息">
						<a-textarea v-model="form.remark"
												:auto-size="{ minRows: 3, maxRows: 5 }"
												placeholder="请填写备注信息" />
					</a-form-model-item>
					<a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
						<a-button type="primary"
											@click="onSubmit">
							完成，下一条
						</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
		</a-modal>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			ModalText: 'Content of the modal',
			visible: false,
			confirmLoading: false,
			labelCol: { span: 6 },
			wrapperCol: { span: 17 },
			form: {
				visit_result: '1',
				remark: '',
				phone: '13243234456',
				name: '张三',
			},
		}
	},
	props: {
		modalVisible: {
			type: Boolean,
		},
		recordInfo: {
			type: Object,
		},
  },
  watch:{
    modalVisible:{
      handler(val){
        if(val){
          console.log(val,'modal')
        }
      }
    }
  },
	mounted() {},
	methods: {
		showModal() {
			this.visible = true
		},
		onSubmit() {
			console.log('submit!', this.form)
		},
		handleOk(e) {
			this.ModalText = 'The modal will be closed after two seconds'
			this.confirmLoading = true
			setTimeout(() => {
				this.$emit('update:modalVisible', false)
				this.visible = false
				this.confirmLoading = false
			}, 2000)
		},
		handleCancel(e) {
			console.log('Clicked cancel button')
			this.$emit('update:modalVisible', false)
		},
	},
}
</script>
<style lang='less' scoped>
//@imgUrl:'../assets/images';
.form-content {
	padding-top: 20px;
}
.t-right {
	text-align: right;
}
</style>