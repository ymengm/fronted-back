<template>
    <div id="categary">
        <div class="handle-con clearfix">
            <el-button type="primary" icon="el-icon-plus" class="add-button" @click="addClick">增加分类</el-button>
            <el-input v-model="searchText" placeholder="请输入分类名称" class="search-input" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="table-con" v-loading="loading">
            <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column
                prop="name"
                label="名称">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间">
                </el-table-column>
                <el-table-column
                label="操作"
                width="150"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" class="add-dialog" width="30%">
            <div>
                <label>分类名称：</label>
                <el-input v-model="addName" placeholder="请输入分类名称" ></el-input>
            </div>
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSureClick">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="30%"
            class="delete-dialog">
            <span class="delete-title">确认删除该条信息？</span>
            <span slot="footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'categary',
    data () {
        return {
            searchText: '',
            tableData: [],
            currentCategory: null,
            dialogTitle: '新增分类',
            addDialogVisible: false,
            deleteDialogVisible: false,
            addName: '',
            loading: true
        }
    },
    mounted () {
        this.tableData = [
            {
                id: 1,
                name: '分类1',
                createTime: '2019-08-02'
            },
            {
                id: 2,
                name: '分类2',
                createTime: '2019-08-02'
            },
            {
                id: 3,
                name: '分类3',
                createTime: '2019-08-02'
            }
        ]
        this.loading = false
    },
    methods: {
        addClick () {
            this.dialogTitle = "新增分类"
            this.addDialogVisible = true
            this.currentCategory = null
            this.addName = ''
        },
        editClick (row) {
            this.currentCategory = row.id
            this.dialogTitle = "修改分类"
            this.addName = row.name
            this.addDialogVisible = true 
        },
        addSureClick () {
            this.addDialogVisible = false 
        },
        deleteClick (row) {
            console.log('shanchu')
            this.currentCategory = row.id
            this.deleteDialogVisible = true 
        },
        deleteSure () {
            this.deleteDialogVisible = false 
        }
    }
}
</script>
<style lang="less" scoped>
#categary {
    background-color: #ffffff;
    padding: 30px;
    .handle-con {
        .add-button {
            float: left;
        }
        .search-input {
            float: right;
        }
    }
    .table-con {
        padding-top: 20px;
    }
    .delete-dialog {
        .delete-title {
            font-size: 16px;
            padding-left: 46px;
        }
    }
    .el-input {
        width: 224px;
    }
}
</style>
