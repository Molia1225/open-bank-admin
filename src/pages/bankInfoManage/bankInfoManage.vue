<template>
	<a-card class="new-page beauty-scroll"
					:style="`height: ${pageMinHeight+100}px`">
		<a-form layout="horizontal">
			<div class="fold">
				<a-row>
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="搜索"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-input placeholder="请输入关键字查询" />
						</a-form-item>
					</a-col>
					<a-col :md="8"
								 :sm="24">
						<div style="margin:5px 0 0 8px;">
							<a-button type="primary">查询</a-button>
							<a-button style="margin-left: 8px">重置</a-button>
						</div>
					</a-col>
				</a-row>

			</div>

		</a-form>
		<div>
			<div class="operator">
				<a-button type="primary" @click="addBankInfo">+新增银行</a-button>
			</div>
			<standard-table :columns="columns"
											:dataSource="dataSource"
											@change="onChange">
				<div slot="description"
						 slot-scope="{text}">
					{{text}}
				</div>
				<div slot="action"
						 slot-scope="{text, record}">
					<a style="margin-right: 8px">
						<a-icon type="plus" />编辑
					</a>
					<a-popconfirm title="确认是否删除?"
												ok-text="确认"
												cancel-text="取消"
												@confirm="confirm(record.key)">
						<a href="#">删除</a>
					</a-popconfirm>
				</div>
				<template slot="statusTitle">
					<a-icon @click.native="onStatusTitleClick"
									type="info-circle" />
				</template>
			</standard-table>
			<bankInfoForm :modalVisible.sync="modalVisible" />
		</div>
	</a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import bankInfoForm from './component/bankInfoForm'
import { mapState } from 'vuex'

const columns = [
	{
		title: '银行编号',
		dataIndex: 'no',
	},
	{
		title: '描述',
		dataIndex: 'description',
		scopedSlots: { customRender: 'description' },
	},
	{
		title: '服务调用次数',
		dataIndex: 'callNo',
		needTotal: true,
		customRender: (text) => text + ' 次',
	},
	{
		dataIndex: 'status',
		needTotal: true,
		slots: { title: 'statusTitle' },
	},
	{
		title: '更新时间',
		dataIndex: 'updatedAt',
	},
	{
		title: '操作',
		scopedSlots: { customRender: 'action' },
	},
]

const dataSource = []

for (let i = 0; i < 100; i++) {
	dataSource.push({
		key: i,
		no: '银行编号00' + i,
		description: '这是一段描述',
		callNo: Math.floor(Math.random() * 1000),
		status: Math.floor(Math.random() * 10) % 4,
		updatedAt: '2018-07-26',
	})
}

export default {
	name: 'QueryList',
	components: { StandardTable,bankInfoForm },
	data() {
		return {
			advanced: true,
			columns: columns,
			dataSource: dataSource,
      selectedRows: [],
      modalVisible:false,
		}
	},
	computed: {
		...mapState('setting', ['pageMinHeight']),
	},
	methods: {
		confirm(key) {
			this.dataSource = this.dataSource.filter((item) => item.key !== key)
			this.selectedRows = this.selectedRows.filter((item) => item.key !== key)
    },
    addBankInfo(){
      this.modalVisible = true
    },
		onStatusTitleClick() {
			this.$message.info('你点击了状态栏表头')
		},
		onChange() {
			this.$message.info('表格状态改变了')
		},
		onSelectChange() {
			this.$message.info('选中行改变了')
		},
	},
}
</script>

<style lang="less" scoped>
@import 'index';
.search {
	margin-bottom: 54px;
}
.fold {
	width: calc(100% - 216px);
	display: inline-block;
}
.operator {
	margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
	.fold {
		width: 100%;
	}
}
</style>
