<template>
    <div id="grade">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/operation/game/game_list' }">比赛1</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/operation/game/${gameId}/group` }">小组1</el-breadcrumb-item>
            <el-breadcrumb-item>队员信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="handle-con clearfix">
                <el-button type="primary" icon="el-icon-plus" class="add-button" @click="addClick">增加队员</el-button>
                <el-input v-model="searchText" placeholder="请输入队员名称" class="search-input" suffix-icon="el-icon-search"></el-input>
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
                    prop="grade"
                    label="成绩">
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
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" width="30%">
            <div>
                <label>队员名字：</label>
                <el-input v-model="addName" placeholder="请输入名字" ></el-input>
            </div>
            <div style="margin-top: 10px;">
                <label>队员成绩：</label>
                <el-input v-model="addGrade" placeholder="请输入成绩" ></el-input>
            </div>
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSureClick">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="20%"
            class="delete-dialog">
            <span class="delete-title">确认删除该队员信息？</span>
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
            gameId: this.$route.params['g_id'],
            groupId: this.$route.params['p_id'],
            searchText: '',
            tableData: [],
            currentGrade: null,
            addDialogVisible: false,
            deleteDialogVisible: false,
            addName: '',
            addGrade: '',
            dialogTitle: '',
            loading: true
        }
    },
    mounted ( ){
        this.tableData = [
            {
                id: 1,
                name: '张三',
                grade: '90'
            },
            {
                id: 2,
                name: '里斯',
                grade: '80'
            },
            {
                id: 3,
                name: '王五',
                grade: '60'
            }
        ]
        this.loading = false
    },
    methods: {
        addClick () {
            this.dialogTitle = "新增队员信息"
            this.addName = ''
            this.addGrade = ''
            this.addDialogVisible = true
            this.currentGroup = null
            this.addGame = ''
        },
        editClick (row) {
            this.currentGrade = row.id
            this.addName = row.name
            this.addGrade = row.grade
            this.dialogTitle = "修改队员信息"
            this.addDialogVisible = true 
        },
        addSureClick () {
            this.addDialogVisible = false 
        },
        deleteClick (row) {
            this.currentGroup = row.id
            this.deleteDialogVisible = true 
        },
        deleteSure () {
            this.deleteDialogVisible = false 
        }
    }
}
</script>
<style lang="less" scoped>
#grade {
    .el-breadcrumb {
        height: 46px;
        background-color: #ffffff;
        line-height: 46px;
        padding-left: 30px;
    }
    .content {
        margin-top: 20px;
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
