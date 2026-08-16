import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="👥 用户管理" description="管理管理员、注册用户、角色和账号状态。" />
      <Panel title="用户列表" action={<StatusBadge>等待 Supabase Auth</StatusBadge>}>
        <EmptyState title="用户数据库尚未连接" description="当前网站没有注册登录体系。下一阶段接入 Supabase Auth 后，这里将支持搜索、角色分配、禁用账号和登录记录查看。" />
      </Panel>
    </>
  );
}
