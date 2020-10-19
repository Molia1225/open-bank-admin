<!-- 回访表单组件 -->
<template>
	<div class='bank-form'>
		<a-modal :visible="modalVisible"
						 title="银行信息"
						 :confirm-loading="confirmLoading"
						 :footer="null"
						 :maskClosable='false'
						 @ok="handleOk"
						 :width="800"
						 @cancel="handleCancel">
			<div class="form-content">
				<a-form-model :model="form"
											:label-col="labelCol"
											:wrapper-col="wrapperCol">
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="银行名称">
								<a-input placeholder="请输入银行名称"></a-input>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="状态">
								<a-select v-model="form.status"
													placeholder="请选择状态">
									<a-select-option value="1">
										启用
									</a-select-option>
									<a-select-option value="0">
										禁用
									</a-select-option>
								</a-select>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="资金门槛">
								<a-input placeholder="请输入资金门槛"></a-input>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="资金锁定期">
								<a-input placeholder="请输入资金锁定期"></a-input>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-divider orientation="center"
										 style="margin-top:-16px;font-size:14px;">
						账户管理费
					</a-divider>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="内地">
								<a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
														v-model="form.mainland"
														placeholder="请输入内地管理费"></a-textarea>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="香港">
								<a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
														v-model="form.mainland"
														placeholder="请输入香港管理费"></a-textarea>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-divider orientation="center"
										 style="margin-top:-16px;font-size:14px;">
						转账手续费
					</a-divider>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="行内互转">
								<a-input placeholder="请输入互转手续费"></a-input>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="汇出">
								<a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
														v-model="form.mainland"
														placeholder="请输入汇出手续费"></a-textarea>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="汇入">
								<a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
														v-model="form.mainland"
														placeholder="请输入汇入手续费"></a-textarea>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-divider orientation="center"
										 style="margin-top:-16px;font-size:14px;">
						其他
					</a-divider>
					<a-row>
						<a-col :span="24">
							<a-form-model-item label="所需材料"
																 :labelCol="{ span:4}"
																 :wrapper-col="{ span:20}">
								<a-checkable-tag color="pink"
																 v-model="material.check1"
																 @change="(checked)=>handleChange(checked,'check1')">
									身份证
								</a-checkable-tag>
								<a-checkable-tag v-model="material.check2"
																 @change="(checked)=>handleChange(checked,'check2')">
									护照
								</a-checkable-tag>
								<a-checkable-tag v-model="material.check3"
																 @change="(checked)=>handleChange(checked,'check3')">
									地址证明文件
								</a-checkable-tag>
								<a-checkable-tag v-model="material.check4"
																 @change="(checked)=>handleChange(checked,'check4')">
									港澳通行证
								</a-checkable-tag>
								<a-checkable-tag v-model="material.check5"
																 @change="(checked)=>handleChange(checked,'check5')">
									港澳通行证或护照
								</a-checkable-tag>
								<a-checkable-tag v-model="material.check6"
																 @change="(checked)=>handleChange(checked,'check6')">
									港澳通行证或长期签注
								</a-checkable-tag>
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-form-model-item :wrapper-col="{ span:3, offset: 21 }">
						<a-button type="primary"
											@click="onSubmit">
							确认
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
			wrapperCol: { span: 16 },
			form: {
				bank_name: '',
				status: '1',
				mainland: '',
				// material: [false, false, false, false, false, false],
      },
      material: {
        check1:false,
        check2:false,
        check3:false,
        check4:false,
        check5:false,
        check6:false,
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
	watch: {
		modalVisible: {
			handler(val) {
				if (val) {
					console.log(val, 'modal')
				}
			},
		},
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
			this.$emit('update:modalVisible', false)
		},
		handleChange(checked,type) {
      console.log(type,checked)
      // 护照 和 港澳通行证或护照互斥
      if(type=='check2'){
        this.$set(this.material,'check5',!checked)
      }
      if(type=='check5'){
        this.$set(this.material,'check2',!checked)
      }
      // 港澳通行证、港澳通行证或护照和港澳通行证和长期签注互斥
      if(type=='check4'){
        this.$set(this.material,'check5',!checked)
        this.$set(this.material,'check6',!checked)
      }
      if(type=='check5'){
        this.$set(this.material,'check4',!checked)
        this.$set(this.material,'check6',!checked)
        this.$set(this.material,'check2',!checked)
      }
      if(type=='check6'){
        this.$set(this.material,'check5',!checked)
        this.$set(this.material,'check4',!checked)
      }
		},
	},
}
</script>
<style lang='less' scoped>
//@imgUrl:'../assets/images';
.form-content {
	// padding-top: 20px;
}
</style>