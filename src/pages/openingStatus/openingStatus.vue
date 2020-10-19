<template>
	<a-card class="new-page beauty-scroll"
					:style="`height: ${pageMinHeight+100}px`">
		<a-form layout="horizontal">
			<div :class="advanced ? null: 'fold'">
				<a-row>
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="规则编号"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-input placeholder="请输入" />
						</a-form-item>
					</a-col>
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="使用状态"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-select placeholder="请选择">
								<a-select-option value="1">关闭</a-select-option>
								<a-select-option value="2">运行中</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="调用次数"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-input-number style="width: 100%"
															placeholder="请输入" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row v-if="advanced">
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="更新日期"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-date-picker style="width: 100%"
														 placeholder="请输入更新日期" />
						</a-form-item>
					</a-col>
					<a-col :md="8"
								 :sm="24">
						<a-form-item label="使用状态"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-select placeholder="请选择">
								<a-select-option value="1">关闭</a-select-option>
								<a-select-option value="2">运行中</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<!-- <a-col :md="8"
								 :sm="24">
						<a-form-item label="描述"
												 :labelCol="{span: 5}"
												 :wrapperCol="{span: 18, offset: 1}">
							<a-input placeholder="请输入" />
						</a-form-item>
					</a-col> -->
				</a-row>
			</div>
			<span style="float: right; margin-top: 3px;">
				<a-button type="primary">查询</a-button>
				<a-button style="margin-left: 8px">重置</a-button>
				<a @click="toggleAdvanced"
					 style="margin-left: 8px">
					{{advanced ? '收起' : '展开'}}
					<a-icon :type="advanced ? 'up' : 'down'" />
				</a>
			</span>
		</a-form>
		<div>
			<div class="operator">
				<a-button type="primary">置为已同步</a-button>
				<a-button type="primary"
									style="margin-left: 8px">置为已开卡</a-button>
				<a-button type="primary"
									style="margin-left: 8px">置为未开卡</a-button>
			</div>
			<standard-table :columns="columns"
											:dataSource="dataSource"
											:selectedRows.sync="selectedRows"
											@change="onChange"
											@selectedRowChange="onSelectChange">
				<div slot="description"
						 slot-scope="{text}">
					{{text}}
				</div>
				<div slot="action"
						 slot-scope="{record}">
					<a style="margin-right: 8px">
						置为已同步{{record.key}}
					</a>
					<a style="margin-right: 8px">
						置为已开卡
					</a>
					<a>
						置为未开卡
					</a>
					<!-- <a @click="deleteRecord(record.key)"
						 v-auth="`delete`">
						<a-icon type="delete" />删除2
					</a> -->
				</div>
				<template slot="statusTitle">
					<a-icon @click.native="onStatusTitleClick"
									type="info-circle" />
				</template>
			</standard-table>
		</div>
	</a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import { mapState } from 'vuex'

const columns = [
	{
		title: '规则编号',
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
		sorter: true,
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
		sorter: true,
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
		no: i,
		description: '这是一段描述',
		callNo: Math.floor(Math.random() * 1000),
		status: Math.floor(Math.random() * 10) % 4,
		updatedAt: '2018-07-26',
	})
}

export default {
	name: 'QueryList',
	components: { StandardTable },
	data() {
		return {
			advanced: true,
			columns: columns,
			dataSource: dataSource,
			selectedRows: [],
		}
	},
	computed: {
		...mapState('setting', ['pageMinHeight']),
	},
	authorize: {
		deleteRecord: 'delete',
	},
	methods: {
    toggleAdvanced() {
			this.advanced = !this.advanced
		},
		deleteRecord(key) {
			this.dataSource = this.dataSource.filter((item) => item.key !== key)
			this.selectedRows = this.selectedRows.filter((item) => item.key !== key)
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
